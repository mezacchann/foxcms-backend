export default interface ContentTypeField {
  contentTypeId?: number
  contentTypeName?: string
  readonly fieldName: string
  readonly fieldType: any
  readonly isRequired: boolean
}
