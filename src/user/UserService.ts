import { Injectable, Inject } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(@Inject('PrismaBinding') private prismaBinding) {}
  getUser(email: string, info: string = '{id}') {
    return this.prismaBinding.query.user(
      {
        where: {
          email,
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
