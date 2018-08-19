import { ContentTypeFieldType } from './ContentTypeFieldType'

export default interface ContentTypeFieldCreateInput {
  contentTypeId?: number
  name: string
  type: ContentTypeFieldType
  isRequired: boolean
}
