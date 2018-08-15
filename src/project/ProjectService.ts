import { Injectable, Inject } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { GraphQLClient } from 'graphql-request'
import * as scuid from 'scuid'
import { ADD_PROJECT, DEPLOY } from './mutations'
import { PrismaDataModel } from './../prisma/PrismaDataModel'
import { Project } from './Project'
import ContentTypeFieldCreateInput from '../content-type/ContentTypeFieldCreateInput'
import { ContentTypeService } from '../content-type/ContentTypeService'

@Injectable()
export class ProjectService {
  prismaServerEndpoint = new URL(process.env.PRISMA_SERVER_ENDPOINT)
  managementApiClient = new GraphQLClient(
    `${this.prismaServerEndpoint.origin}/management`,
    {
      headers: {
        Authorization: `Bearer ${this.prismaManagementToken}`,
      },
    },
  )
  constructor(
    @Inject('PrismaBinding') private prismaBinding,
    @Inject('PrismaManagementToken') private prismaManagementToken,
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

  async buildProject(stage: string = 'Production'): Promise<string> {
    const projectName = scuid()
    await this.managementApiClient.request(ADD_PROJECT, {
      name: projectName,
      stage,
    })
    await this.deploy(projectName, stage, 'type Initial{id: ID}')
    return projectName
  }

  async addContentType(project: Project, typeName: string): Promise<string> {
    const datamodel = new PrismaDataModel(project.datamodel)
    const modifiedDatamodel = datamodel.addType(typeName)
    await this.deploy(project.generatedName, project.stage, modifiedDatamodel)
    await this.updateProjectDatamodel(project.id, modifiedDatamodel)
    return modifiedDatamodel
  }

  async deleteContentType(id: number) {
    const contentType = await this.contentTypeService.getContentType(
      id,
      '{name project{id generatedName stage datamodel}}',
    )
    if (!contentType) {
      throw new Error(`Content type with id ${id} doesnt exist`)
    }
    const { project } = contentType
    const datamodel = new PrismaDataModel(project.datamodel)
    const modifiedDatamodel = datamodel.deleteType(contentType.name)
    await this.deploy(project.generatedName, project.stage, modifiedDatamodel)
    await this.updateProjectDatamodel(project.id, modifiedDatamodel)
    return modifiedDatamodel
  }

  async addContentTypeField(field: ContentTypeFieldCreateInput) {
    const contentType = await this.contentTypeService.getContentType(
      field.contentTypeId,
      '{name project{id generatedName stage datamodel}}',
    )
    if (!contentType) {
      throw new Error(
        `Content type with id ${field.contentTypeId} doesnt exist`,
      )
    }
    const { project } = contentType
    const datamodel = new PrismaDataModel(project.datamodel)
    const modifiedDatamodel = datamodel.addField(contentType.name, field)
    await this.deploy(project.generatedName, project.stage, modifiedDatamodel)
    await this.updateProjectDatamodel(project.id, modifiedDatamodel)
    return modifiedDatamodel
  }

  async deleteContentTypeField(id: number) {
    const contentTypeField = await this.contentTypeService.getContentTypeField(
      id,
      '{name contentType{name project{id generatedName stage datamodel}}}',
    )
    if (!contentTypeField) {
      throw new Error(`Content type field with id ${id} doesnt exist`)
    }
    const { contentType } = contentTypeField
    const { project } = contentType
    const datamodel = new PrismaDataModel(project.datamodel)
    const modifiedDatamodel = datamodel.deleteContentTypeField(
      contentType.name,
      contentTypeField.name,
    )
    await this.deploy(project.generatedName, project.stage, modifiedDatamodel)
    await this.updateProjectDatamodel(project.id, modifiedDatamodel)
    return modifiedDatamodel
  }

  async generateTempProjectToken(generatedName: string) {
    const project = await this.prismaBinding.query.project(
      {
        where: {
          generatedName,
        },
      },
      '{providedName generatedName stage}',
    )
    if (!project) {
      throw new Error(`Project ${generatedName} doesn't exist`)
    }
    return jwt.sign(
      { project: project.providedName, stage: project.stage },
      process.env.FOXCMS_SECRET + project.generatedName,
      { expiresIn: '1h' },
    )
  }

  async generateProjectToken(projectId: number, temporary: boolean = true) {
    const project = await this.prismaBinding.query.project(
      {
        where: {
          id: projectId,
        },
      },
      '{providedName generatedName stage}',
    )
    return jwt.sign(
      { project: project.providedName, stage: project.stage },
      process.env.FOXCMS_SECRET + project.generatedName,
      { expiresIn: temporary ? '1h' : '1y' },
    )
  }

  private async deploy(projectName: string, stage: string, datamodel: string) {
    await this.managementApiClient.request(DEPLOY, {
      projectName,
      stage,
      types: datamodel,
      secrets: process.env.FOXCMS_SECRET + projectName,
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
