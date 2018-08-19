import { Injectable, Inject } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { GraphQLClient } from 'graphql-request'
import * as scuid from 'scuid'
import { ADD_PROJECT, DEPLOY } from './mutations'
import { PrismaDataModel } from './../prisma/PrismaDataModel'
import { Project } from './Project'
import ContentTypeFieldCreateInput from '../content-type/ContentTypeFieldCreateInput'
import { ContentTypeService } from '../content-type/ContentTypeService'
import User from 'user/User'
import { ContentType } from 'content-type/ContentType'
import { Prisma } from 'prisma-binding'
import { ContentTypeField } from 'content-type/ContentTypeField'

@Injectable()
export class ProjectService {
  prismaServerEndpoint = new URL(process.env.PRISMA_SERVER_ENDPOINT)
  managementApiClient = new GraphQLClient(`${this.prismaServerEndpoint.origin}/management`, {
    headers: {
      Authorization: `Bearer ${this.prismaManagementToken}`,
    },
  })
  constructor(
    @Inject('PrismaBinding') private prismaBinding: Prisma,
    @Inject('PrismaManagementToken') private prismaManagementToken: string,
    private contentTypeService: ContentTypeService,
  ) {}

  private async checkUserPermission(projectId: number, user: User): Promise<void> {
    const res = await this.prismaBinding.exists.Project({
      id: projectId,
      user: { id: user.id },
    })
    if (
      !(await this.prismaBinding.exists.Project({
        id: projectId,
        user: { id: user.id },
      }))
    ) {
      throw new Error(`Cannot find project ${projectId}`)
    }
  }

  async getProject(id: number, user: User, info: any = '{id}'): Promise<Project> {
    this.checkUserPermission(id, user)
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

  async deleteContentType(id: number, user: User): Promise<string> {
    const contentType = (await this.contentTypeService.getContentType(
      id,
      '{name project{id generatedName stage datamodel}}',
    )) as ContentType
    if (!contentType) {
      throw new Error(`Content type with id ${id} doesnt exist`)
    }
    this.checkUserPermission(contentType.project.id, user)
    const { project } = contentType
    const datamodel = new PrismaDataModel(project.datamodel)
    const modifiedDatamodel = datamodel.deleteType(contentType.name)
    await this.deploy(project.generatedName, project.stage, modifiedDatamodel)
    await this.updateProjectDatamodel(project.id, modifiedDatamodel)
    return modifiedDatamodel
  }

  async addContentTypeField(field: ContentTypeFieldCreateInput, user: User): Promise<string> {
    const contentType = (await this.contentTypeService.getContentType(
      field.contentTypeId,
      '{name project{id generatedName stage datamodel}}',
    )) as ContentType
    if (!contentType) {
      throw new Error(`Content type with id ${field.contentTypeId} doesnt exist`)
    }
    this.checkUserPermission(contentType.project.id, user)
    const { project } = contentType
    const datamodel = new PrismaDataModel(project.datamodel)
    const modifiedDatamodel = datamodel.addField(contentType.name, field)
    await this.deploy(project.generatedName, project.stage, modifiedDatamodel)
    await this.updateProjectDatamodel(project.id, modifiedDatamodel)
    return modifiedDatamodel
  }

  async deleteContentTypeField(id: number, user: User): Promise<string> {
    const contentTypeField = (await this.contentTypeService.getContentTypeField(
      id,
      '{name contentType{name project{id generatedName stage datamodel}}}',
    )) as ContentTypeField
    if (!contentTypeField) {
      throw new Error(`Content type field with id ${id} doesnt exist`)
    }
    this.checkUserPermission(contentTypeField.contentType.project.id, user)
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

  generateProjectToken(project: Project, temporary: boolean = true): string {
    return jwt.sign(
      { project: project.providedName, stage: project.stage },
      process.env.FOXCMS_SECRET + project.generatedName,
      { expiresIn: temporary ? '1h' : '1y' },
    )
  }

  private async deploy(projectName: string, stage: string, datamodel: string): Promise<void> {
    await this.managementApiClient.request(DEPLOY, {
      projectName,
      stage,
      types: datamodel,
      secrets: process.env.FOXCMS_SECRET + projectName,
    })
  }

  private async updateProjectDatamodel(projectId, datamodel: string): Promise<Project> {
    return this.prismaBinding.mutation.updateProject(
      {
        where: {
          id: projectId,
        },
        data: {
          datamodel,
        },
      },
      '{id}' as any,
    )
  }
}
