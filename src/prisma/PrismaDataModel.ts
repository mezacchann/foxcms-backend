import { Injectable, Inject, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';
import outdent from 'outdent';

const appendFile = util.promisify(fs.appendFile);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

@Injectable()
export class PrismaDataModel {
  private readonly logger = new Logger(PrismaDataModel.name, true);
  constructor(
    @Inject('ContentTypesDatamodel') private contentTypeDataModel: Buffer,
    @Inject('ContentTypeDataModelPath')
    private contentTypeDataModelPath: string,
  ) {}

  async addType(typeName: string) {
    if (this.typeExists(typeName))
      throw new Error(`Type ${typeName} already exists`);
    if (/\s/.test(typeName))
      throw new Error('Type name may not contain any whitespaces');
    try {
      await this.addTypeToDatamodel(typeName);
      this.reloadDatamodel();
      this.logger.log(`Added and deployed new content type ${typeName}`);
    } catch (err) {
      this.logger.error(err);
      throw new Error('Type cannot be added');
    }
  }

  async addField(
    contentTypeName: string,
    fieldName: string,
    fieldType: any,
    isRequired: boolean,
  ) {
    if (!this.typeExists(contentTypeName))
      throw new Error(
        `Cannot add Field. Type ${contentTypeName} doesn't exist`,
      );
    if (this.fieldExistsWithinType(contentTypeName, fieldName))
      throw new Error(
        `Field ${fieldName} exists already within type ${contentTypeName}`,
      );
    await this.addFieldToDatamodel(
      contentTypeName,
      fieldName,
      fieldType,
      isRequired,
    );
    this.reloadDatamodel();
  }

  private async addTypeToDatamodel(typeName: string) {
    const typeTemplate = outdent`\n
    type ${typeName} {
      id: ID! @unique
    }`;
    return appendFile(this.contentTypeDataModelPath, typeTemplate);
  }

  private async addFieldToDatamodel(
    contentTypeName: string,
    fieldName: string,
    fieldType: any,
    isRequired: boolean,
  ) {
    const fileContent = this.contentTypeDataModel.toString();
    const matchedType = fileContent.match(
      `type\\\s${contentTypeName}\\\s*\\{[^{}]*`,
    )[0];
    const idx = fileContent.indexOf(matchedType) + matchedType.length;
    const result =
      fileContent.slice(0, idx) +
      `  ${fieldName}: ${fieldType}${isRequired ? '!' : ''}\n` +
      fileContent.slice(idx);
    return writeFile(this.contentTypeDataModelPath, result);
  }

  async deleteType(contentTypeName: string) {
    if (!this.typeExists(contentTypeName))
      throw new Error(`Type ${contentTypeName} doesn't exists`);
    const fileContent = this.contentTypeDataModel.toString();
    const regex = new RegExp(
      `type\\\s*${contentTypeName}\\\s*\\{[^{}]*\\}\\\s`,
    );
    await writeFile(
      this.contentTypeDataModelPath,
      fileContent.replace(regex, ''),
    );
    this.reloadDatamodel();
  }

  async deleteContentTypeField(contentTypeName: string, fieldName: string) {
    if (!this.typeExists(contentTypeName))
      throw new Error(`Type ${contentTypeName} doesn't exists`);
    if (!this.fieldExistsWithinType(contentTypeName, fieldName))
      throw new Error(
        `Field ${fieldName} doesn't existP within type ${contentTypeName}`,
      );
    const fileContent = this.contentTypeDataModel.toString();
    const regex = new RegExp(`type.*${contentTypeName}\\\s*\\{[^{}]*\\}`);
    const matchedContent = fileContent.match(regex)[0];
    const typeWithRemovedField = matchedContent.replace(
      new RegExp(`[^\S\r\n]*${fieldName}.*\n`),
      '',
    );
    await writeFile(
      this.contentTypeDataModelPath,
      fileContent.replace(matchedContent, typeWithRemovedField),
    );
    this.reloadDatamodel();
  }

  private fieldExistsWithinType(typeName: string, fieldName: string) {
    const regex = new RegExp(`type.*${typeName}.*{([^}]+)}`);
    const result = this.contentTypeDataModel.toString().match(regex);
    return result[0].indexOf(fieldName) > -1;
  }

  private typeExists(typeName: string): boolean {
    const regex = new RegExp(`type.*${typeName}.*{`);
    const result = this.contentTypeDataModel.toString().match(regex);
    return result !== null;
  }

  private reloadDatamodel() {
    const fileContent = fs.readFileSync(this.contentTypeDataModelPath);
    this.contentTypeDataModel = fileContent;
  }

  getContentTypeDataModel(): Buffer {
    return Buffer.from(this.contentTypeDataModel);
  }
}
