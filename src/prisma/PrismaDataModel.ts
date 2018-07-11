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
  private static readonly contentTypeDataModelPath =
    './prisma/contentTypes.graphql';
  private readonly logger = new Logger(PrismaDataModel.name, true);
  constructor(
    @Inject('ContentTypesDatamodel') private contentTypeDataModel: Buffer,
  ) {}

  async addType(typeName: string) {
    if (this.typeExists(typeName))
      throw new Error(`Type ${typeName} already exists`);
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
    const indexOfDataType = this.contentTypeDataModel.indexOf(contentTypeName);
    if (indexOfDataType === -1)
      throw new Error(
        `Cannot add Field. Type ${contentTypeName} doesn't exist`,
      );
    await this.addFieldToDatamodel(
      contentTypeName,
      fieldName,
      fieldType,
      isRequired,
    );
  }

  private async addTypeToDatamodel(typeName: string) {
    const typeTemplate = outdent`\n
    type ${typeName} {
      id: ID! @unique
    }`;
    return appendFile(PrismaDataModel.contentTypeDataModelPath, typeTemplate);
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
    writeFile(PrismaDataModel.contentTypeDataModelPath, result);
  }

  async deleteType(contentTypeName: string) {
    const fileContent = this.contentTypeDataModel.toString();
    const regex = new RegExp(`type.*${contentTypeName}\\\s*\\{[^{}]*\\}`);
    writeFile(
      PrismaDataModel.contentTypeDataModelPath,
      fileContent.replace(regex, ''),
    );
  }

  async deleteContentTypeField(contentTypeName: string, fieldName: string) {
    const fileContent = this.contentTypeDataModel.toString();
    const regex = new RegExp(`type.*${contentTypeName}\\\s*\\{[^{}]*\\}`);
    const matchedContent = fileContent.match(regex)[0];
    if (matchedContent === null)
      return new Error(`Cannot find content type ${contentTypeName}`);
    const typeWithRemovedField = matchedContent.replace(
      new RegExp(`${fieldName}.*\\s`),
      '',
    );
    writeFile(
      PrismaDataModel.contentTypeDataModelPath,
      fileContent.replace(regex, typeWithRemovedField),
    );
  }

  private typeExists(typeName: string): boolean {
    const regex = new RegExp(`type.*${typeName}.*{`);
    const result = this.contentTypeDataModel.toString().match(regex);
    return result !== null;
  }

  private async reloadDatamodel() {
    const fileContent = await readFile(
      PrismaDataModel.contentTypeDataModelPath,
    );
    this.contentTypeDataModel = fileContent;
  }

  async deploy() {
    return spawn('prisma', ['deploy', 'f']);
  }
}
