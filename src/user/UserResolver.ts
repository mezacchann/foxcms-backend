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
      '{username imageUri password salt projects{providedName generatedName stage}}',
    )) as User
    if (!user || bcrypt.hashSync(password, user.salt) !== user.password) {
      throw new Error('You have entered an invalid username or password')
    }
    return this.authService.createToken({
      username: user.username,
      imageUri: user.imageUri,
      projects: user.projects,
    })
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
      '{username projects imageUri {id}}',
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
    return this.authService.createToken({
      username: user.username,
      projects: user.projects,
    })
  }
}
