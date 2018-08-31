import { Injectable, Inject } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { AuthService } from '../auth/AuthService'
import { Prisma } from '../typings/prisma'
import { ProjectService } from '../project/ProjectService'

@Injectable()
export class UserService {
  constructor(
    @Inject('PrismaBinding') private prismaBinding: Prisma,
    private readonly authService: AuthService,
    private readonly projectService: ProjectService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.getUser(username, '{id password')
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid username or password')
    }
    return this.authService.createToken({
      sub: user.id.toString(),
    })
  }

  async signup(username: string, password: string) {
    if (await this.getUser(username)) {
      throw new Error('Username already in use')
    }
    const salt = bcrypt.genSaltSync()
    const user = await this.prismaBinding.mutation.createUser(
      {
        data: {
          username,
          password: bcrypt.hashSync(password, salt),
          salt,
        },
      },
      '{id}',
    )
    await this.projectService.buildProject(user.id)
    return this.authService.createToken({
      sub: user.id,
    })
  }

  getUser(username: string, info: any = '{id}') {
    return this.prismaBinding.query.user(
      {
        where: {
          username,
        },
      },
      info,
    )
  }

  getUserById(id: string, info: any = '{id}') {
    return this.prismaBinding.query.user(
      {
        where: {
          id,
        },
      },
      info,
    )
  }
}
