import Model from './Model';

export class Validator {
  private readonly model: Model

  constructor(model: Model) {
    this.model = model
  }

  isTypeCreatable(typeName: string): boolean {
    if (this.typeExists(typeName)) {
      throw new Error(`Type ${typeName} already exists`)
    }
    if (/\s/.test(typeName)) {
      throw new Error('Type name may not contain any whitespaces')
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
      throw new Error(
        `Field ${fieldName} exists already within type ${typeName}`,
      )
    }
    this.validateTypeExistence(typeName)
    return true
  }

  isFieldDeletable(typeName: string, fieldName: string): boolean {
    if (!this.typeExists(typeName)) {
      throw new Error(`Type ${typeName} doesn't exists`)
    }
    if (!this.fieldExistsWithinType(typeName, fieldName)) {
      throw new Error(
        `Field ${fieldName} doesn't exist within type ${typeName}`,
      )
    }
    return true
  }

  private validateTypeExistence(typeName) {
    if (!this.typeExists(typeName)) {
      throw new Error(`Type ${typeName} doesn't exist`)
    }
  }

  private typeExists(typeName: string): boolean {
    const regex = new RegExp(`type.*${typeName}.*{`)
    const result = this.model.content.match(regex)
    return result !== null
  }

  private fieldExistsWithinType(typeName: string, fieldName: string) {
    const regex = new RegExp(`type.*${typeName}.*{([^}]+)}`)
    const result = this.model.content.match(regex)
    return result[0].indexOf(fieldName) > -1
  }
}