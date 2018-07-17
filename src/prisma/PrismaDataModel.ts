import { Injectable, Inject, Logger } from '@nestjs/common';
import { writeFileSync } from 'fs';
import outdent from 'outdent';
import { spawnSync } from 'child_process';
import { request } from 'graphql-request';
import { encode } from 'base-64';
@Injectable()
export class PrismaDataModel {
  private readonly logger = new Logger(PrismaDataModel.name, true);
  constructor(
    @Inject('DynamicModel') private content: string,
    @Inject('PrismaEndpoint') private prismaEndpoint: string,
    @Inject('DynamicModelPath')
    private contentTypeDataModelPath: string,
  ) {}

  addType(typeName: string) {
    if (this.typeExists(typeName))
      throw new Error(`Type ${typeName} already exists`);
    if (/\s/.test(typeName))
      throw new Error('Type name may not contain any whitespaces');
    this.addTypeToDatamodel(typeName);
    this.logger.log(`Added and deployed new content type ${typeName}`);
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
  }

  private addTypeToDatamodel(typeName: string) {
    const typeTemplate = outdent`
    type ${typeName} {
      id: ID! @unique
    }`;
    if (this.content !== '') this.content += '\n';
    this.updateModel(this.content + typeTemplate);
  }

  private updateModel(content: string) {
    this.updateRemoteModel(content);
    this.updateLocalModel(content);
    this.deploy();
  }

  private updateLocalModel(content: string) {
    this.content = content;
    writeFileSync(this.contentTypeDataModelPath, content);
  }

  private async updateRemoteModel(content: string) {
    const query = `mutation {
      updateConfiguration(where: {name: "dynamicModel"}, data: {value: "${encode(
        content,
      )}"}) {
        value
      }
    }`;
    await request(this.prismaEndpoint, query);
  }

  private addFieldToDatamodel(
    contentTypeName: string,
    fieldName: string,
    fieldType: any,
    isRequired: boolean,
  ) {
    const matchedType = this.content.match(
      `type\\\s${contentTypeName}\\\s*\\{[^{}]*`,
    )[0];
    const idx = this.content.indexOf(matchedType) + matchedType.length;
    const result =
      this.content.slice(0, idx) +
      `  ${fieldName}: ${fieldType}${isRequired ? '!' : ''}\n` +
      this.content.slice(idx);
    this.updateModel(result);
  }

  deleteType(contentTypeName: string) {
    if (!this.typeExists(contentTypeName))
      throw new Error(`Type ${contentTypeName} doesn't exists`);
    const regex = new RegExp(
      `type\\\s*${contentTypeName}\\\s*\\{[^{}]*\\}\\\s`,
    );
    this.updateModel(this.content.replace(regex, ''));
  }

  deleteContentTypeField(contentTypeName: string, fieldName: string) {
    if (!this.typeExists(contentTypeName))
      throw new Error(`Type ${contentTypeName} doesn't exists`);
    if (!this.fieldExistsWithinType(contentTypeName, fieldName))
      throw new Error(
        `Field ${fieldName} doesn't exist within type ${contentTypeName}`,
      );
    const regex = new RegExp(`type.*${contentTypeName}\\\s*\\{[^{}]*\\}`);
    const matchedContent = this.content.match(regex)[0];
    const typeWithRemovedField = matchedContent.replace(
      new RegExp(`[^\S\r\n]*${fieldName}.*\n`),
      '',
    );
    this.updateModel(
      this.content.replace(matchedContent, typeWithRemovedField),
    );
  }

  private fieldExistsWithinType(typeName: string, fieldName: string) {
    const regex = new RegExp(`type.*${typeName}.*{([^}]+)}`);
    const result = this.content.match(regex);
    return result[0].indexOf(fieldName) > -1;
  }

  private typeExists(typeName: string): boolean {
    const regex = new RegExp(`type.*${typeName}.*{`);
    const result = this.content.match(regex);
    return result !== null;
  }

  getContent(): string {
    return this.content;
  }

  deploy() {
    spawnSync('node_modules/.bin/prisma', ['deploy', 'f']);
  }
}
