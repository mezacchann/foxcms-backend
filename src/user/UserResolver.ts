import { Resolver, Mutation } from '@nestjs/graphql'
import { ProjectService } from './../project/ProjectService'
import * as randomString from 'randomstring'

@Resolver('User')
export class UserResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation()
  async signup(obj, { email }, context, info) {
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
