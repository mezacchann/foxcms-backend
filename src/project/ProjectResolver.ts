import { Resolver, Mutation, Query } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ProjectService } from './../project/ProjectService'
import { ContentType } from 'content-type/ContentType'
import { ContentTypeField } from 'content-type/ContentTypeField'
import { ProjectWithToken } from './ProjectWithToken'

@Resolver('Project')
@UseGuards(AuthGuard('jwt'))
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation()
  async createProject(obj, { name }, context, info) {
    return await this.projectService.buildProject(obj.user.id, name, 'Production', info)
  }

  @Query()
  getProject(obj, { id }, context, info) {
    return this.projectService.getProject(id, obj.user, info)
  }

  @Query()
  async getProjectWithToken(obj, { id }, context, info): Promise<ProjectWithToken | null> {
    let project
    if (id) {
      project = await this.projectService.getProject(
        id,
        obj.user,
        '{id providedName generatedName stage}',
      )
    } else {
      project = await this.projectService.getFirstUserProject(
        obj.user,
        '{id providedName generatedName stage}',
      )
    }
    if (!project) {
      return null
    }
    const token = await this.projectService.generateProjectToken(project)
    return {
      project,
      token,
    }
  }

  @Query()
  async generatePermToken(obj, { id }, context, info): Promise<string> {
    const project = await this.projectService.getProject(
      id,
      obj.user,
      '{providedName generatedName stage}',
    )
    if (!project) {
      throw new Error(`Project ${id} does not exist`)
    }
    return this.projectService.generateProjectToken(project, false)
  }

  @Mutation()
  async addContentType(
    obj,
    { projectId, contentTypeName, description },
    context,
    info,
  ): Promise<ContentType> {
    const project = await this.projectService.getProject(
      projectId,
      obj.user,
      `{
      id
      generatedName
      stage
      datamodel
     }`,
    )
    await this.projectService.addContentType(project, contentTypeName)
    return context.prisma.mutation.createContentType(
      {
        data: {
          name: contentTypeName,
          description,
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      },
      info,
    )
  }

  @Mutation()
  async deleteContentType(obj, { id }, context, info): Promise<ContentType> {
    await this.projectService.deleteContentType(id, obj.user)
    return context.prisma.mutation.deleteContentType(
      {
        where: {
          id,
        },
      },
      info,
    )
  }

  @Mutation()
  async addContentTypeField(
    obj,
    { contentTypeField },
    context,
    info,
  ): Promise<ContentTypeField> {
    await this.projectService.addContentTypeField(contentTypeField, obj.user)
    return context.prisma.mutation.createContentTypeField(
      {
        data: {
          contentType: {
            connect: {
              id: contentTypeField.contentTypeId,
            },
          },
          name: contentTypeField.name,
          type: contentTypeField.type,
          isRequired: contentTypeField.isRequired,
        },
      },
      info,
    )
  }

  @Mutation()
  async deleteContentTypeField(obj, { id }, context, info): Promise<ContentTypeField> {
    await this.projectService.deleteContentTypeField(id, obj.user)
    return context.prisma.mutation.deleteContentTypeField(
      {
        where: {
          id,
        },
      },
      info,
    )
  }
}
