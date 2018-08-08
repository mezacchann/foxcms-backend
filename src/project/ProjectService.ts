import { Injectable, Inject } from '@nestjs/common'
import { generate } from 'randomstring'
import { request } from 'graphql-request'
import { ADD_PROJECT, DEPLOY } from './mutations'
import { PrismaDataModel } from './../prisma/PrismaDataModel'
import { Project } from './Project'

@Injectable()
export class ProjectService {
  constructor(@Inject('PrismaBinding') private prismaBinding) {}

  prismaServerEndpoint = new URL(process.env.PRISMA_SERVER_ENDPOINT)

  getProject(projectId: number, info: string = '{id}') {
    return this.prismaBinding.query.project(
      {
        where: {
          id: projectId,
        },
      },
      info,
    )
  }
  async buildProject(stage: string = 'dev', secret?: string): Promise<string> {
    const projectName = generate({
      length: 7,
      readable: true,
      charset: 'alphabetic',
    })
    await request(
      `${this.prismaServerEndpoint.origin}/management`,
      ADD_PROJECT,
      {
        name: projectName,
        stage,
      },
    )
    return projectName
  }

  async addContentType(project: Project, typeName: string): Promise<string> {
    const datamodel = new PrismaDataModel(project.datamodel)
    const newDatamodel = datamodel.addType(typeName)
    await this.deploy(project.generatedName, project.stage, newDatamodel)
    await this.updateProjectDatamodel(project.id, newDatamodel)
    return newDatamodel
  }

  private async deploy(projectName: string, stage: string, datamodel: string) {
    await request(`${this.prismaServerEndpoint.origin}/management`, DEPLOY, {
      projectName,
      stage,
      types: datamodel,
    })
  }

  private async updateProjectDatamodel(projectId, datamodel: string) {
    await this.prismaBinding.mutation.updateProject(
      {
        where: {
          id: projectId,
        },
        data: {
          datamodel,
        },
      },
      '',
    )
  }
}
