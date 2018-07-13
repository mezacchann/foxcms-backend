import { Injectable, Inject, Logger } from '@nestjs/common';
import { appendFileSync, readFileSync, writeFileSync } from 'fs';
import outdent from 'outdent';
import { spawnSync } from 'child_process';

@Injectable()
export class PrismaDataModel {
  private readonly logger = new Logger(PrismaDataModel.name, true);
  constructor(
    @Inject('ContentTypesDatamodel') private contentTypeDataModel: Buffer,
    @Inject('ContentTypeDataModelPath')
    private contentTypeDataModelPath: string,
  ) {}

  addType(typeName: string) {
    if (this.typeExists(typeName))
      throw new Error(`Type ${typeName} already exists`);
    if (/\s/.test(typeName))
      throw new Error('Type name may not contain any whitespaces');
    try {
      this.addTypeToDatamodel(typeName);
      this.reloadDatamodel();
      this.deploy();
      this.logger.log(`Added and deployed new content type ${typeName}`);
    } catch (err) {
      this.logger.error(err);
      throw new Error('Type cannot be added');
    }
  }

  addField(
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
    this.addFieldToDatamodel(contentTypeName, fieldName, fieldType, isRequired);
    this.reloadDatamodel();
    this.deploy();
  }

  private addTypeToDatamodel(typeName: string) {
    const typeTemplate = outdent`\n
    type ${typeName} {
      id: ID! @unique
    }`;
    appendFileSync(this.contentTypeDataModelPath, typeTemplate);
  }

  private addFieldToDatamodel(
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
    writeFileSync(this.contentTypeDataModelPath, result);
  }

  deleteType(contentTypeName: string) {
    if (!this.typeExists(contentTypeName))
      throw new Error(`Type ${contentTypeName} doesn't exists`);
    const fileContent = this.contentTypeDataModel.toString();
    const regex = new RegExp(
      `type\\\s*${contentTypeName}\\\s*\\{[^{}]*\\}\\\s`,
    );
    writeFileSync(
      this.contentTypeDataModelPath,
      fileContent.replace(regex, ''),
    );
    this.reloadDatamodel();
    this.deploy();
  }

  deleteContentTypeField(contentTypeName: string, fieldName: string) {
    if (!this.typeExists(contentTypeName))
      throw new Error(`Type ${contentTypeName} doesn't exists`);
    if (!this.fieldExistsWithinType(contentTypeName, fieldName))
      throw new Error(
        `Field ${fieldName} doesn't exist within type ${contentTypeName}`,
      );
    const fileContent = this.contentTypeDataModel.toString();
    const regex = new RegExp(`type.*${contentTypeName}\\\s*\\{[^{}]*\\}`);
    const matchedContent = fileContent.match(regex)[0];
    const typeWithRemovedField = matchedContent.replace(
      new RegExp(`[^\S\r\n]*${fieldName}.*\n`),
      '',
    );
    writeFileSync(
      this.contentTypeDataModelPath,
      fileContent.replace(matchedContent, typeWithRemovedField),
    );
    this.reloadDatamodel();
    this.deploy();
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
    const fileContent = readFileSync(this.contentTypeDataModelPath);
    this.contentTypeDataModel = fileContent;
  }

  getContentTypeDataModel(): Buffer {
    return Buffer.from(this.contentTypeDataModel);
  }

  private deploy() {
    spawnSync('prisma', ['deploy', 'f']);
  }
}
