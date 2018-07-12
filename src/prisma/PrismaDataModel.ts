import { Injectable, Inject, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';
import { spawn } from 'child-process-promise';
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
      await this.reloadDatamodel();
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
    await this.reloadDatamodel();
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
    const idx =
      fileContent.indexOf(`type ${contentTypeName} {`) +
      `type ${contentTypeName} {`.length;
    const result =
      fileContent.slice(0, idx) +
      `\n  ${fieldName}: ${fieldType}${isRequired ? '!' : ''}` +
      fileContent.slice(idx);
    return writeFile(this.contentTypeDataModelPath, result);
  }

  async deleteType(contentTypeName: string) {
    if (!this.typeExists(contentTypeName))
      throw new Error(`Type ${contentTypeName} doesn't exists`);
    const fileContent = this.contentTypeDataModel.toString();
    const regex = new RegExp(`type.*${contentTypeName}\\\s*\\{[^{}]*\\}`);
    await writeFile(
      this.contentTypeDataModelPath,
      fileContent.replace(regex, ''),
    );
    await this.reloadDatamodel();
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
      new RegExp(`${fieldName}.*`),
      '',
    );
    await writeFile(
      this.contentTypeDataModelPath,
      fileContent.replace(matchedContent, typeWithRemovedField),
    );
    await this.reloadDatamodel();
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

  private async reloadDatamodel() {
    const fileContent = await readFile(this.contentTypeDataModelPath);
    this.contentTypeDataModel = fileContent;
  }

  async deploy() {
    return spawn('prisma', ['deploy', 'f']);
  }

  getContentTypeDataModel(): Buffer {
    return Buffer.from(this.contentTypeDataModel);
  }
}
