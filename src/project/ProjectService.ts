import { Injectable } from '@nestjs/common'
import { generate } from 'randomstring'
import { request } from 'graphql-request'
import { ADD_PROJECT, DEPLOY } from './mutations'
import { PrismaDataModel } from './../prisma/PrismaDataModel'
import { Project } from './Project'

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

  async addContentType(project: Project, typeName: string): Promise<string> {
    const datamodel = new PrismaDataModel(project.datamodel)
    const newDatamodel = datamodel.addType(typeName)
    await this.deploy(project.generatedName, project.stage, newDatamodel)
    return newDatamodel
  }

  private async deploy(projectName: string, stage: string, datamodel: string) {
    const endpoint = new URL(process.env.PRISMA_SERVER_ENDPOINT)
    await request(`${endpoint.origin}/management`, DEPLOY, {
      projectName,
      stage,
      types: datamodel,
    })
  }
}
