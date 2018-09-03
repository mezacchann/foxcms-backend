import * as _ from 'lodash'
import * as v from 'voca'
import { ContentTypeFieldType } from '../content-type/ContentTypeFieldType'

export default class Datamodel {
  static DEFAULT = 'type Initial{id: ID! @unique}'
  private readonly typeTemplate = _.template(
    'type <%= type %>{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}',
  )
  private readonly fieldTemplate = _.template(
    `,<%= field %>:<%= fieldType %><%= required ? '!':''%>`,
  )
  private typeRegex = _.template('type\\s<%= type %>{.*?}')
  private fieldRegex = _.template(',?<%= field %>:.*?(,|(?=}))')
  private model: string
  constructor(model) {
    this.model = model
  }
  addType(type: string) {
    if (this.typeExists(type)) {
      throw new Error('Type exists already')
    } else if (!this.nameIsValid(type)) {
      throw new Error('Invalid name')
    }
    const createdType = this.typeTemplate({ type })
    this.model += createdType
    return this.model
  }
  addField(type: string, field: string, fieldType: ContentTypeFieldType, required: boolean) {
    if (!this.typeExists(type)) {
      throw new Error(`Type ${type} doesn't exist`)
    } else if (!this.nameIsValid(field)) {
      throw new Error('Invalid name')
    }
    const typeRegex = new RegExp(this.typeRegex({ type }))
    const matchedType = typeRegex.exec(this.model)
    if (!matchedType) {
      throw new Error('Cannot match content type')
    } else if (new RegExp(this.fieldRegex({ field })).test(matchedType[0])) {
      throw new Error('Field already exist')
    }
    this.model = v.insert(
      this.model,
      this.fieldTemplate({ field, fieldType, required }),
      matchedType.index + matchedType[0].length - 1,
    )
    return this.model
  }
  deleteType(type: string) {
    if (!this.typeExists(type)) {
      throw new Error('Type doesnt exist')
    }
    this.model = this.model.replace(new RegExp(this.typeRegex({ type })), '')
    return this.model
  }
  deleteField(type: string, field: string) {
    if (!this.typeExists(type)) {
      throw new Error('Type doesnt exist')
    }
    const typeRegex = new RegExp(this.typeRegex({ type }))
    const matchedType = typeRegex.exec(this.model)
    if (!matchedType) {
      throw new Error('Cannot match content type')
    } else if (!new RegExp(this.fieldRegex({ field })).test(matchedType[0])) {
      throw new Error('Field doesnt exist')
    }
    const modifiedType = matchedType[0].replace(new RegExp(this.fieldRegex({ field })), '')
    this.model = this.model.replace(matchedType[0], modifiedType)
    return this.model
  }
  typeExists(type: string): boolean {
    const typeExists = new RegExp(this.typeRegex({ type }))
    return typeExists.test(this.model)
  }
  nameIsValid(name: string) {
    const validName = /^[a-zA-Z]+[a-zA-Z0-9]*$/
    return validName.test(name)
  }
}
