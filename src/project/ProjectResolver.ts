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
}
