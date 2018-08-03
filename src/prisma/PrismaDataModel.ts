import {
  Injectable,
  Inject,
} from '@nestjs/common'
import outdent from 'outdent'
import { spawnSync } from 'child_process'
import { request } from 'graphql-request'
import { encode } from 'base-64'
import ContentTypeField from '../content-type/ContentTypeField'
import { Validator } from './Validator'
import Model from './Model';

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

  private validator: Validator
  constructor(
    @Inject('DynamicModel') private model: Model,
    @Inject('PrismaEndpoint') private prismaEndpoint: string,
  ) {
    this.validator = new Validator(model)
  }

  addType(typeName: string) {
    this.validator.isTypeCreatable(typeName)
    this.addTypeToDatamodel(typeName)
  }

  addField(field: ContentTypeField) {
    const { contentTypeName, fieldName, fieldType, isRequired } = field
    this.validator.isFieldCreatable(contentTypeName, fieldName)
    const newDatamodel = this.addFieldToDatamodel({
      contentTypeName,
      fieldName,
      fieldType: this.customTypeToDataType[fieldType],
      isRequired,
    })
    this.updateModel(newDatamodel)
  }

  addFields(contentTypeFields: ContentTypeField[]) {
    let newDatamodel
    contentTypeFields.forEach(contentTypeField => {
      const {
        contentTypeName,
        fieldName,
        fieldType,
        isRequired,
      } = contentTypeField

      this.validator.isFieldCreatable(contentTypeName, fieldName)

      newDatamodel = this.addFieldToDatamodel({
        contentTypeName,
        fieldName,
        fieldType,
        isRequired,
      })
      this.updateLocalModel(newDatamodel)
    })
    this.updateModel(newDatamodel)
  }

  private addTypeToDatamodel(typeName: string) {
    const typeTemplate = outdent`
    type ${typeName} {
      id: ID! @unique
    }`
    if (this.model.content !== '') this.model.content += '\n'
    this.updateModel(this.model.content + typeTemplate)
  }

  private updateModel(content: string) {
    this.deploy()
    this.updateRemoteModel(content)
    this.updateLocalModel(content)
  }

  private updateLocalModel(content: string) {
    this.model.content = content
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

  private addFieldToDatamodel(field: ContentTypeField): string {
    const { contentTypeName, fieldName, fieldType, isRequired } = field
    const matchedType = this.model.content.match(
      `type\\\s${contentTypeName}\\\s*\\{[^{}]*`,
    )[0]
    const idx = this.model.content.indexOf(matchedType) + matchedType.length
    const result =
      this.model.content.slice(0, idx) +
      `  ${fieldName}: ${fieldType}${isRequired ? '!' : ''}\n` +
      this.model.content.slice(idx)
    return result
  }

  deleteType(contentTypeName: string) {
    this.validator.isTypeDeletable(contentTypeName)
    const regex = new RegExp(`type\\\s*${contentTypeName}\\\s*\\{[^{}]*\\}\\\s`)
    this.updateModel(this.model.content.replace(regex, ''))
  }

  deleteContentTypeField(contentTypeName: string, fieldName: string) {
    this.validator.isFieldDeletable(contentTypeName, fieldName)
    const regex = new RegExp(`type.*${contentTypeName}\\\s*\\{[^{}]*\\}`)
    const matchedContent = this.model.content.match(regex)[0]
    const typeWithRemovedField = matchedContent.replace(
      new RegExp(`[^\S\r\n]*${fieldName}.*\n`),
      '',
    )
    this.updateModel(this.model.content.replace(matchedContent, typeWithRemovedField))
  }

  getContent(): string {
    return this.model.content
  }

  deploy() {
    const res = spawnSync('node_modules/.bin/prisma', ['deploy', 'f'])
  }
}
