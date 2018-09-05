import { Injectable, Inject } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import * as scuid from 'scuid'
import ContentTypeFieldCreateInput from '../content-type/ContentTypeFieldCreateInput'
import { ContentTypeService } from '../content-type/ContentTypeService'
import User from 'user/User'
import { Prisma, Project } from '../typings/prisma'
import { ContentType } from 'content-type/ContentType'
import { ContentTypeField } from 'content-type/ContentTypeField'
import Datamodel from '../prisma/Datamodel'
import PrismaServer from '../prisma/PrismaServer'

@Injectable()
export class ProjectService {
  constructor(
    @Inject('PrismaBinding') private readonly prismaBinding: Prisma,
    private prismaServer: PrismaServer,
    private contentTypeService: ContentTypeService,
  ) {}

  private async checkUserPermission(projectId: number, user: User): Promise<void> {
    if (
      !(await this.prismaBinding.exists.Project({
        id: projectId,
        user: { id: user.id },
      }))
    ) {
      throw new Error(`Cannot find project ${projectId}`)
    }
  }

  async buildProject(
    userId: string,
    providedName = 'initial-project',
    stage: string = 'Production',
    info = '{id}',
  ) {
    const projectName = scuid()
    await this.prismaServer.addService(projectName, stage)
    await this.prismaServer.deploy(projectName, stage)
    return this.prismaBinding.mutation.createProject(
      {
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          providedName,
          generatedName: projectName,
          stage: 'Production',
          datamodel: Datamodel.DEFAULT,
        },
      },
      info,
    )
  }

  async getProject(id: string, user: User, info: string = '{id}') {
    const projects = await this.prismaBinding.query.projects(
      {
        where: {
          AND: [{ id }, { user: { id: user.id } }],
        },
      },
      info,
    )
    return projects[0]
  }

  async getFirstUserProject(user: User, info: string = '{id}') {
    const projects = await this.prismaBinding.query.projects(
      {
        where: {
          user: { id: user.id },
        },
      },
      info,
    )
    return projects[0]
  }

  generateProjectToken(project: Project, temporary: boolean = true) {
    return jwt.sign(
      { project: project.providedName, stage: project.stage },
      process.env.FOXCMS_SECRET + project.generatedName,
      { expiresIn: temporary ? '1h' : '1y' },
    )
  }

  async addContentType(project: Project, typeName: string): Promise<string> {
    const datamodel = new Datamodel(project.datamodel)
    const modifiedDatamodel = datamodel.addType(typeName)
    await this.prismaServer.deploy(project.generatedName, project.stage, modifiedDatamodel)
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
    const datamodel = new Datamodel(project.datamodel)
    const modifiedDatamodel = datamodel.deleteType(contentType.name)
    await this.prismaServer.deploy(project.generatedName, project.stage, modifiedDatamodel)
    await this.updateProjectDatamodel(project.id, modifiedDatamodel)
    return modifiedDatamodel
  }

  async addContentTypeField(field: ContentTypeFieldCreateInput, user: User): Promise<string> {
    if (!field.contentTypeId) {
      throw new Error('')
    }
    const contentType = (await this.contentTypeService.getContentType(
      field.contentTypeId,
      '{name project{id generatedName stage datamodel}}',
    )) as ContentType
    if (!contentType) {
      throw new Error(`Content type with id ${field.contentTypeId} doesnt exist`)
    }
    this.checkUserPermission(contentType.project.id, user)
    const { project } = contentType
    const datamodel = new Datamodel(project.datamodel)
    const modifiedDatamodel = datamodel.addField(
      contentType.name,
      field.name,
      field.type,
      field.isRequired,
    )
    await this.prismaServer.deploy(project.generatedName, project.stage, modifiedDatamodel)
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
    const datamodel = new Datamodel(project.datamodel)
    const modifiedDatamodel = datamodel.deleteField(contentType.name, contentTypeField.name)
    await this.prismaServer.deploy(project.generatedName, project.stage, modifiedDatamodel)
    await this.updateProjectDatamodel(project.id, modifiedDatamodel)
    return modifiedDatamodel
  }

  async updateProjectDatamodel(projectId, datamodel: string) {
    return this.prismaBinding.mutation.updateProject(
      {
        where: {
          id: projectId,
        },
        data: {
          datamodel,
        },
      },
      '{id}',
    )
  }
}
