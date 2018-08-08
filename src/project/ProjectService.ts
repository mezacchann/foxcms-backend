import { Injectable } from '@nestjs/common'
import { generate } from 'randomstring'
import { request } from 'graphql-request'
import { ADD_PROJECT } from './mutations'

@Injectable()
export class ProjectService {
  async buildProject(stage: string = 'dev', secret?: string): Promise<string> {
    const endpoint = new URL(process.env.PRISMA_SERVER_ENDPOINT)
    const projectName = generate({ length: 6, readable: true })
    await request(`${endpoint.origin}/management`, ADD_PROJECT, {
      name: projectName,
      stage,
    })
    return projectName
  }
}
