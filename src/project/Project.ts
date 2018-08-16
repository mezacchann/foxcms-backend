import User from '../user/User'
import { ContentType } from 'content-type/ContentType'

export interface Project {
  id: number
  user: User
  types: ContentType
  providedName: string
  generatedName: string
  stage: string
  secret: string
  datamodel: string
}
