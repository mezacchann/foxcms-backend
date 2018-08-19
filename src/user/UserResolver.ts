import { Resolver, Query } from '@nestjs/graphql'
import { ProjectService } from './../project/ProjectService'
import { UserService } from './UserService'
import { AuthService } from '../auth/AuthService'
import * as bcrypt from 'bcrypt'
import User from './User'
import { Project } from 'project/Project'

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly projectService: ProjectService,
  ) {}

  @Query()
  async login(obj, { username, password }, context, info) {
    const user = await this.userService.getUser(
      username,
      '{id username imageUri password salt projects{id}}',
    )
    if (!user || bcrypt.hashSync(password, user.salt) !== user.password) {
      throw new Error('You have entered an invalid username or password')
    }
    const firstProject = user.projects[0] as Project
    return this.authService.createToken({
      username: user.username,
      imageUri: user.imageUri,
      project: firstProject.id,
    })
  }

  @Query()
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
      '{id username imageUri}',
    )) as User
    const projectName = await this.projectService.buildProject()
    const project = (await context.prisma.mutation.createProject(
      {
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          providedName: 'initial-project',
          generatedName: projectName,
          stage: 'Production',
        },
      },
      '{id}',
    )) as Project
    return this.authService.createToken({
      username: user.username,
      project: project.id,
    })
  }
}
