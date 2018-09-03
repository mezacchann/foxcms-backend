import Datamodel from './PrismaDataModel'
export class Validator {
  private readonly datamodel: Datamodel

  constructor(datamodel: Datamodel) {
    this.datamodel = datamodel
  }

  isTypeCreatable(typeName: string): boolean {
    if (this.typeExists(typeName)) {
      throw new Error(`Type ${typeName} already exists`)
    }
    if (/\s/.test(typeName)) {
      throw new Error('Type name may not contain any whitespaces')
    }
    if (/^\d/.test(typeName)) {
      throw new Error('Type name must start with a letter')
    }
    return true
  }

  isTypeUpdatable(oldTypeName: string, newTypeName: string): boolean {
    if (!this.typeExists(oldTypeName)) {
      throw new Error(`Type ${oldTypeName} doesn't exists`)
    }
    if (/\s/.test(newTypeName)) {
      throw new Error('Type name may not contain any whitespaces')
    }
    if (/^\d/.test(newTypeName)) {
      throw new Error('Type name must start with a letter')
    }
    return true
  }

  isTypeDeletable(typeName: string): boolean {
    if (!this.typeExists(typeName)) {
      throw new Error(`Type ${typeName} doesn't exists`)
    }
    return true
  }

  isFieldCreatable(typeName: string, fieldName: string): boolean {
    if (this.fieldExistsWithinType(typeName, fieldName)) {
      throw new Error(`Field ${fieldName} exists already within type ${typeName}`)
    }
    if (/\s/.test(fieldName)) {
      throw new Error('Field name may not contain any whitespaces')
    }
    if (/^\d/.test(fieldName)) {
      throw new Error('Field name must start with a letter')
    }
    this.validateTypeExistence(typeName)
    return true
  }

  isFieldDeletable(typeName: string, fieldName: string): boolean {
    if (!this.typeExists(typeName)) {
      throw new Error(`Type ${typeName} doesn't exists`)
    }
    if (!this.fieldExistsWithinType(typeName, fieldName)) {
      throw new Error(`Field ${fieldName} doesn't exist within type ${typeName}`)
    }
    return true
  }

  private validateTypeExistence(typeName) {
    if (!this.typeExists(typeName)) {
      throw new Error(`Type ${typeName} doesn't exist`)
    }
  }

  private typeExists(typeName: string): boolean {
    const regex = new RegExp(`type ${typeName} \{.*?\}`)
    const result = this.datamodel.content.match(regex)
    return result !== null
  }

  private fieldExistsWithinType(typeName: string, fieldName: string) {
    const regex = new RegExp(`type ${typeName} \\{[^{}]*\\}`)
    const result = this.datamodel.content.match(regex)
    if (!result) {
      throw new Error('Cannot find content type')
    }
    return result[0].indexOf(fieldName) > -1
  }
}
