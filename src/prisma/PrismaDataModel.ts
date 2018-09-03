import { Validator } from './Validator'
import ContentTypeFieldCreateInput from '../content-type/ContentTypeFieldCreateInput'
import { ContentTypeFieldType } from '../content-type/ContentTypeFieldType'

export default interface Datamodel {
  content: string
}

export class PrismaDataModel {
  static DEFAULT = 'type Initial{id: ID! @unique}'
  private validator: Validator
  private datamodel: Datamodel
  constructor(datamodel: string) {
    this.datamodel = { content: datamodel }
    this.validator = new Validator(this.datamodel)
  }

  addType(typeName: string): string {
    this.validator.isTypeCreatable(typeName)
    const typeTemplate = `type ${typeName} {id: ID! @unique createdAt: DateTime! updatedAt: DateTime! }`
    this.datamodel.content += typeTemplate
    return this.datamodel.content
  }

  addField(contentTypeName: string, field: ContentTypeFieldCreateInput): string {
    const newDatamodel = this.addFieldToModel(contentTypeName, {
      ...field,
      type: field.type,
    })
    this.datamodel.content = newDatamodel
    return this.datamodel.content
  }

  private addFieldToModel(
    contentTypeName: string,
    field: ContentTypeFieldCreateInput,
  ): string {
    const { name, type, isRequired } = field
    this.validator.isFieldCreatable(contentTypeName, name)
    const matchedType = this.datamodel.content.match(
      `type\\\s${contentTypeName}\\\s*\\{[^{}]*`,
    )
    if (!matchedType) {
      throw new Error('Cannot find appropriate content type')
    }
    const idx = this.datamodel.content.indexOf(matchedType[0]) + matchedType.length
    const result =
      this.datamodel.content.slice(0, idx) +
      `${name}: ${ContentTypeFieldType[type]}${isRequired ? '!' : ''} ` +
      this.datamodel.content.slice(idx)
    return result
  }

  deleteType(contentTypeName: string): string {
    this.validator.isTypeDeletable(contentTypeName)
    const regex = new RegExp(`type ${contentTypeName} \\{.*?\\}`)
    this.datamodel.content = this.datamodel.content.replace(regex, '')
    return this.datamodel.content
  }

  deleteContentTypeField(contentTypeName: string, fieldName: string): string {
    this.validator.isFieldDeletable(contentTypeName, fieldName)
    const regex = new RegExp(`type ${contentTypeName} \\{.*?\\}`)
    const matchedContent = this.datamodel.content.match(regex)
    if (!matchedContent) {
      throw new Error('Cannot find appropriate content type')
    }
    const typeWithRemovedField = matchedContent[0].replace(
      new RegExp(`${fieldName}:\\s.*?\\s`),
      '',
    )
    this.datamodel.content = this.datamodel.content.replace(
      matchedContent[0],
      typeWithRemovedField,
    )
    return this.datamodel.content
  }

  updateContentTypeName(oldTypeName: string, newTypeName: string): string {
    this.validator.isTypeUpdatable(oldTypeName, newTypeName)
    const newModel = this.datamodel.content.replace(
      `type ${oldTypeName}`,
      `type ${newTypeName}`,
    )
    this.datamodel.content = newModel
    return this.datamodel.content
  }
}
