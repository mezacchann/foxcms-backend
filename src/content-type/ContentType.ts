import { Project } from '../project/Project'
import { ContentTypeField } from './ContentTypeField'

export interface ContentType {
  id: number
  project: Project
  name: string
  description: string
  fields: ContentTypeField[]
}
