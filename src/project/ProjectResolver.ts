import { Resolver, Mutation } from '@nestjs/graphql'
import { ProjectService } from './../project/ProjectService'

@Resolver('Project')
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation()
  async createProject(obj, { userId, name }, context, info) {
    const user = await context.prisma.query.user(
      {
        where: {
          id: userId,
        },
      },
      info,
    )
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
          stage: 'dev',
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
    const project = await context.prisma.query.project(
      {
        where: {
          id: projectId,
        },
      },
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
    const newDatamodel = await this.projectService.addContentType(
      project,
      contentTypeName,
    )
    await context.prisma.mutation.updateProject(
      {
        where: {
          id: projectId,
        },
        data: {
          datamodel: newDatamodel,
        },
      },
      info,
    )
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
}
