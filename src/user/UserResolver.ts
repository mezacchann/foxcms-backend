import { Resolver, Mutation, Query } from '@nestjs/graphql'
import { ProjectService } from './../project/ProjectService'

@Resolver('User')
export class UserResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query()
  user(obj, { email }, context, info) {
    return context.prisma.query.user(
      {
        where: {
          email,
        },
      },
      info,
    )
  }

  @Mutation()
  async createUser(obj, { email }, context, info) {
    const user = await context.prisma.mutation.createUser(
      {
        data: {
          email,
        },
      },
      info,
    )
    const projectName = await this.projectService.buildProject()
    await context.prisma.mutation.createProject(
      {
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          providedName: 'demo-project',
          generatedName: projectName,
          stage: 'dev',
        },
      },
      info,
    )
    return user
  }
}
