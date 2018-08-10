import { Resolver, Mutation, Query } from '@nestjs/graphql'
import { ProjectService } from './../project/ProjectService'
import { UserService } from './UserService'
import { AuthService } from '../auth/AuthService'
import * as bcrypt from 'bcrypt'
import User from './User'

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly projectService: ProjectService,
  ) {}

  @Query()
  async login(obj, { username, password }, context, info) {
    const user = (await this.userService.getUser(
      username,
      '{password salt}',
    )) as User
    if (!user || bcrypt.hashSync(password, user.salt) !== user.password) {
      throw new Error('You have entered an invalid username or password')
    }
    return this.authService.createToken(user)
  }

  @Mutation()
  async signup(obj, { username, password }, context, info) {
    const salt = bcrypt.genSaltSync()
    const user = (await context.prisma.mutation.createUser(
      {
        data: {
          username,
          password: bcrypt.hashSync(password, salt),
          salt,
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
