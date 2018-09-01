import { Resolver, Query } from '@nestjs/graphql'
import { UserService } from './UserService'

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query()
  async login(obj, { username, password }, context, info) {
    return this.userService.login(username, password)
  }

  @Query()
  async signup(obj, { username, password }, context, info) {
    return this.userService.signup(username, password)
  }
}
