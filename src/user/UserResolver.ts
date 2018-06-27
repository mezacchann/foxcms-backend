import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { UserService } from './UserService';

@Resolver('User')
export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Query('user')
    async getUser(obj, { id }, context, info) {
        return await this.userService.find(Number(id));
    }

    @Mutation()
    async createUser(_, { name }) {
        return await this.userService.create(name);
    }
}