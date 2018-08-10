import { Injectable, Inject } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@Inject('PrismaBinding') private prismaBinding) {}
  getUser(username: string, info = '{id}') {
    return this.prismaBinding.query.user(
      {
        where: {
          username,
        },
      },
      info,
    )
  }

  getUserById(id: string, info: string = '{id}') {
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
