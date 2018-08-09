import { Injectable, Inject } from '@nestjs/common'
import { generate } from 'randomstring'
import { request } from 'graphql-request'
import { ADD_PROJECT, DEPLOY } from './mutations'
import { PrismaDataModel } from './../prisma/PrismaDataModel'
import { Project } from './Project'
import ContentTypeFieldCreateInput from '../content-type/ContentTypeFieldCreateInput'
import { ContentTypeService } from '../content-type/ContentTypeService'

@Injectable()
export class ProjectService {
  prismaServerEndpoint = new URL(process.env.PRISMA_SERVER_ENDPOINT)
  constructor(
    @Inject('PrismaBinding') private prismaBinding,
    private contentTypeService: ContentTypeService,
  ) {}

  getProject(id: number, info: string = '{id}') {
    return this.prismaBinding.query.project(
      {
        where: {
          id,
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
    const modifiedDatamodel = datamodel.addType(typeName)
    await this.deploy(project.generatedName, project.stage, modifiedDatamodel)
    await this.updateProjectDatamodel(project.id, modifiedDatamodel)
    return modifiedDatamodel
  }

  async addContentTypeField(field: ContentTypeFieldCreateInput) {
    const contentType = await this.contentTypeService.getContentType(
      field.contentTypeId,
      '{name project{id generatedName stage datamodel}}',
    )
    const { project } = contentType
    const datamodel = new PrismaDataModel(project.datamodel)
    const modifiedDatamodel = datamodel.addField(contentType.name, field)
    await this.deploy(project.generatedName, project.stage, modifiedDatamodel)
    await this.updateProjectDatamodel(project.id, modifiedDatamodel)
    return modifiedDatamodel
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
