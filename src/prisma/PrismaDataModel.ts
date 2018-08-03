import {
  Injectable,
  Inject,
  Logger,
  ConflictException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common'
import { writeFileSync } from 'fs'
import outdent from 'outdent'
import { spawnSync } from 'child_process'
import { request } from 'graphql-request'
import { encode } from 'base-64'
import ContentTypeField from '../content-type/ContentTypeField'
import { Validator } from './Validator'

@Injectable()
export class PrismaDataModel {
  private readonly customTypeToDataType = {
    String: 'String',
    Text: 'String',
    Int: 'Int',
    Float: 'Float',
    Checkbox: 'Boolean',
    Date: 'DateTime',
    Json: 'Json',
  }
  private datamodelCache: string

  constructor(
    @Inject('DynamicModel') private content: string,
    @Inject('PrismaEndpoint') private prismaEndpoint: string,
    @Inject('DynamicModelPath') private contentTypeDataModelPath: string,
  ) {}

  addType(typeName: string) {
    const validator = new Validator(this.content)
    validator.isTypeCreatable(typeName)
    this.addTypeToDatamodel(typeName)
  }

  addField(
    contentTypeName: string,
    fieldName: string,
    fieldType: any,
    isRequired: boolean,
  ) {
    const validator = new Validator(this.content)
    validator.isFieldCreatable(contentTypeName, fieldName)
    const newDatamodel = this.addFieldToDatamodel(
      contentTypeName,
      fieldName,
      this.customTypeToDataType[fieldType],
      isRequired,
    )
    this.updateModel(newDatamodel)
  }

  addFields(contentTypeFields: ContentTypeField[]) {
    let newDatamodel
    this.datamodelCache = String(this.content)
    const validator = new Validator(this.content)
    contentTypeFields.forEach(contentTypeField => {
      validator.isFieldCreatable(
        contentTypeField.contentTypeName,
        contentTypeField.fieldName,
      )

      newDatamodel = this.addFieldToDatamodel(
        contentTypeField.contentTypeName,
        contentTypeField.fieldName,
        this.customTypeToDataType[contentTypeField.fieldType],
        contentTypeField.isRequired,
      )
      this.updateLocalModel(newDatamodel)
    })
    this.updateModel(newDatamodel)
  }

  private addTypeToDatamodel(typeName: string) {
    const typeTemplate = outdent`
    type ${typeName} {
      id: ID! @unique
    }`
    if (this.content !== '') this.content += '\n'
    this.updateModel(this.content + typeTemplate)
  }

  private updateModel(content: string) {
    this.deploy()
    this.updateRemoteModel(content)
    this.updateLocalModel(content)
  }

  private updateLocalModel(content: string) {
    this.content = content
    writeFileSync(this.contentTypeDataModelPath, content)
  }

  private async updateRemoteModel(content: string) {
    const query = `mutation {
      updateConfiguration(where: {name: "dynamicModel"}, data: {value: "${encode(
        content,
      )}"}) {
        value
      }
    }`
    await request(this.prismaEndpoint, query)
  }

  private addFieldToDatamodel(
    contentTypeName: string,
    fieldName: string,
    fieldType: any,
    isRequired: boolean,
  ): string {
    const matchedType = this.content.match(
      `type\\\s${contentTypeName}\\\s*\\{[^{}]*`,
    )[0]
    const idx = this.content.indexOf(matchedType) + matchedType.length
    const result =
      this.content.slice(0, idx) +
      `  ${fieldName}: ${fieldType}${isRequired ? '!' : ''}\n` +
      this.content.slice(idx)
    return result
  }

  deleteType(contentTypeName: string) {
    const validator = new Validator(this.content)
    validator.isTypeDeletable(contentTypeName)
    const regex = new RegExp(`type\\\s*${contentTypeName}\\\s*\\{[^{}]*\\}\\\s`)
    this.updateModel(this.content.replace(regex, ''))
  }

  deleteContentTypeField(contentTypeName: string, fieldName: string) {
    const validator = new Validator(this.content)
    validator.isFieldDeletable(contentTypeName, fieldName)
    const regex = new RegExp(`type.*${contentTypeName}\\\s*\\{[^{}]*\\}`)
    const matchedContent = this.content.match(regex)[0]
    const typeWithRemovedField = matchedContent.replace(
      new RegExp(`[^\S\r\n]*${fieldName}.*\n`),
      '',
    )
    this.updateModel(this.content.replace(matchedContent, typeWithRemovedField))
  }

  getContent(): string {
    return this.content
  }

  deploy() {
    const res = spawnSync('node_modules/.bin/prisma', ['deploy', 'f'])
  }
}
