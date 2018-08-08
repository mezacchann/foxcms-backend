import { Injectable, Inject } from '@nestjs/common'
import { request } from 'graphql-request'
import * as url from 'url'
import ContentTypeField from '../content-type/ContentTypeField'
import { Validator } from './Validator'
import Model from './Model'

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
  private model: Model = { content: '' }
  private validator: Validator
  constructor(
    @Inject('PrismaEndpoint') private prismaEndpoint: string,
  ) {
    this.validator = new Validator(this.model)
  }

  addType(typeName: string): string {
    this.validator.isTypeCreatable(typeName)
    const typeTemplate = `type ${typeName} {id: ID! @unique}`
    return this.updateModel(this.model.content + typeTemplate)
  }

  addField(field: ContentTypeField): string {
    const newDatamodel = this.addFieldToModel({
      ...field,
      fieldType: this.customTypeToDataType[field.fieldType],
    })
    return this.updateModel(newDatamodel)
  }

  private addFieldToModel(field: ContentTypeField): string {
    const { contentTypeName, fieldName, fieldType, isRequired } = field
    this.validator.isFieldCreatable(contentTypeName, fieldName)
    const matchedType = this.model.content.match(
      `type\\\s${contentTypeName}\\\s*\\{[^{}]*`,
    )[0]
    const idx = this.model.content.indexOf(matchedType) + matchedType.length
    const result =
      this.model.content.slice(0, idx) +
      ` ${fieldName}: ${fieldType}${isRequired ? '!' : ''}` +
      this.model.content.slice(idx)
    return result
  }

  deleteType(contentTypeName: string): string {
    this.validator.isTypeDeletable(contentTypeName)
    const regex = new RegExp(`type ${contentTypeName} \\{[^{}]*\\}`)
    return this.updateModel(this.model.content.replace(regex, ''))
  }

  deleteContentTypeField(contentTypeName: string, fieldName: string): string {
    this.validator.isFieldDeletable(contentTypeName, fieldName)
    const regex = new RegExp(`type ${contentTypeName} \\{[^{}]*\\}`)
    const matchedContent = this.model.content.match(regex)[0]
    const typeWithRemovedField = matchedContent.replace(
      new RegExp(`[^\S\r\n]*${fieldName}.*\n`),
      '',
    )
    return this.updateModel(
      this.model.content.replace(matchedContent, typeWithRemovedField),
    )
  }

  updateContentTypeName(oldTypeName: string, newTypeName: string): string {
    this.validator.isTypeUpdatable(oldTypeName, newTypeName)
    const newModel = this.model.content.replace(
      `type ${oldTypeName}`,
      `type ${newTypeName}`,
    )
    return this.updateModel(newModel)
  }

  private updateModel(model: string): string {
    this.deploy(model)
    this.updateRemoteModel(model)
    this.model.content = model
    return model
  }

  private async updateRemoteModel(model: string) {
    const mutation = `mutation {
      updateConfiguration(where: {name: "dynamicModel"}, data: {value: "${model}"}) {
        value
      }
    }`
    await request(this.prismaEndpoint, mutation)
  }

  async deploy(model: string) {
    const mutation = `
    mutation {
      deploy(
        input: {
          name: "foxcms"
          stage: "dev"
          types: "${model}"
        }
      ) {
        errors {
          description
        }
      }
    }`
    const prismaEndpointUrl = url.parse(this.prismaEndpoint)
    try {
      await request(
        `${prismaEndpointUrl.protocol}//${prismaEndpointUrl.host}/management`,
        mutation,
      )
    } catch (err) {
      throw new Error(err.response.errors)
    }
  }
}
