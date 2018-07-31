export default class ContentTypeField {
  readonly contentTypeName: string
  readonly fieldName: string
  readonly fieldType: any
  readonly isRequired: boolean

  constructor(
    contentTypeName: string,
    fieldName: string,
    fieldType: any,
    isRequired: boolean,
  ) {
    this.contentTypeName = contentTypeName
    this.fieldName = fieldName
    this.fieldType = fieldType
    this.isRequired = isRequired
  }
}
