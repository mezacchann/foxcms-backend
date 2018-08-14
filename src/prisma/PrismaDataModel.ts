import { Validator } from './Validator'
import ContentTypeFieldCreateInput from '../content-type/ContentTypeFieldCreateInput'

export default interface Datamodel {
  content: string
}

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
  private datamodel: Datamodel
  constructor(datamodel: string) {
    this.datamodel = { content: datamodel }
    this.validator = new Validator(this.datamodel)
  }

  addType(typeName: string): string {
    this.validator.isTypeCreatable(typeName)
    const typeTemplate = `type ${typeName} {id: ID! @unique }`
    this.datamodel.content += typeTemplate
    return this.datamodel.content
  }

  addField(
    contentTypeName: string,
    field: ContentTypeFieldCreateInput,
  ): string {
    const newDatamodel = this.addFieldToModel(contentTypeName, {
      ...field,
      type: this.customTypeToDataType[field.type],
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
    )[0]
    const idx = this.datamodel.content.indexOf(matchedType) + matchedType.length
    const result =
      this.datamodel.content.slice(0, idx) +
      `${name}: ${type}${isRequired ? '!' : ''} ` +
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
    const matchedContent = this.datamodel.content.match(regex)[0]
    const typeWithRemovedField = matchedContent.replace(
      new RegExp(`${fieldName}:\\s.*?\\s`),
      '',
    )
    this.datamodel.content = this.datamodel.content.replace(
      matchedContent,
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
