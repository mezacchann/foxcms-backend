import { Resolver, Mutation, Query } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ProjectService } from './../project/ProjectService'
import { UserService } from '../user/UserService'

@Resolver('Project')
@UseGuards(AuthGuard('jwt'))
export class ProjectResolver {
  constructor(
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}

  @Query()
  async getProject(obj, { id }, context, info) {
    return context.prisma.query.project(
      {
        where: {
          id,
        },
      },
      info,
    )
  }

  @Query()
  async generatePermToken(obj, { projectId }, context, info) {
    return this.projectService.generateProjectToken(projectId, false)
  }

  @Mutation()
  async createProject(obj, { userId, name }, context, info) {
    const user = await this.userService.getUserById(userId)
    if (!user) {
      throw new Error(`User with id ${userId} does not exist`)
    }
    const projectName = await this.projectService.buildProject()
    return context.prisma.mutation.createProject(
      {
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          providedName: name,
          generatedName: projectName,
          stage: 'Production',
        },
      },
      info,
    )
  }

  @Mutation()
  async addContentType(
    obj,
    { projectId, contentTypeName, description },
    context,
    info,
  ) {
    const project = await this.projectService.getProject(
      projectId,
      `{
      id
      generatedName
      stage
      datamodel
     }`,
    )
    if (!project) {
      throw new Error(`Project with id ${projectId} doesn't exist`)
    }
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
  async deleteContentType(obj, { id }, context, info) {
    await this.projectService.deleteContentType(id)
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
  async addContentTypeField(obj, { contentTypeField }, context, info) {
    await this.projectService.addContentTypeField(contentTypeField)
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
  async deleteContentTypeField(obj, { id }, context, info) {
    await this.projectService.deleteContentTypeField(id)
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
