import { Injectable, Inject } from '@nestjs/common'
import { Prisma } from 'prisma-binding'
import User from './User'

@Injectable()
export class UserService {
  constructor(@Inject('PrismaBinding') private prismaBinding: Prisma) {}
  getUser(username: string, info: any = '{id}'): Promise<User> {
    return this.prismaBinding.query.user(
      {
        where: {
          username,
        },
      },
      info,
    )
  }

  getUserById(id: number, info: any = '{id}'): Promise<User> {
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
