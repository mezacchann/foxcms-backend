import { Resolver, Mutation } from '@nestjs/graphql'
import { UserService } from './UserService'

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation()
  async signup(obj, { email }, context, info) {
    return context.prisma.mutation.createUser(
      {
        data: {
          email,
        },
      },
      info,
    )
  }
}
