import { Resolver, Mutation, Query } from '@nestjs/graphql'
import * as bcrypt from 'bcrypt'
import { ProjectService } from './../project/ProjectService'
import { UserService } from './UserService'
import { AuthService } from '../auth/auth.service'
import User from './User'

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly projectService: ProjectService,
  ) {}

  @Query()
  user(obj, { email }, context, info) {
    return this.userService.getUser(email, info)
  }

  @Mutation()
  async signup(obj, { username, password }, context, info) {
    const user = (await context.prisma.mutation.createUser(
      {
        data: {
          username,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
        },
      },
      '{id username password projects {id}}',
    )) as User
    const projectName = await this.projectService.buildProject()
    const project = await context.prisma.mutation.createProject(
      {
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          providedName: 'initial-project',
          generatedName: projectName,
          stage: 'dev',
        },
      },
      '{providedName generatedName stage}',
    )
    user.projects.push(project)
    const token = this.authService.createToken(user)
    return token
  }
}
