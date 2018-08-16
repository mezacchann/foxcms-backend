import { ContentType } from './ContentType'
import { ContentTypeFieldType } from './ContentTypeFieldType'

export interface ContentTypeField {
  id: number
  contentType: ContentType
  name: string
  type: ContentTypeFieldType
  isRequired: boolean
}
