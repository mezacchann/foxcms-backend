import { Project } from '../typings/prisma'

export interface ProjectWithToken {
  project: Project
  token: string
}
