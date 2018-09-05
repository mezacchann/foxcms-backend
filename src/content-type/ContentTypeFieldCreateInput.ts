import { ContentTypeFieldType } from '../typings/prisma'

export default interface ContentTypeFieldCreateInput {
  contentTypeId: string
  name: string
  type: ContentTypeFieldType
  isRequired: boolean
}
