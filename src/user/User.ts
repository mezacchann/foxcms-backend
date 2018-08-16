import { Project } from 'project/Project'

export default interface User {
  id: number
  username: string
  password: string
  salt: string
  imageUri?: string
  projects: Project[]
}
