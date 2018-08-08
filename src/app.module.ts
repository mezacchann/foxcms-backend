import { Module, Inject } from '@nestjs/common'
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql'
import { ApolloServer } from 'apollo-server-express'
import { UserModule } from './user/UserModule'
import { ContentTypeModule } from './content-type/ContentTypeModule'
import { PrismaModule } from './prisma/PrismaModule'

@Module({
  imports: [GraphQLModule, UserModule, ContentTypeModule, PrismaModule],
})
export class AppModule {
  constructor(
    private readonly graphQLFactory: GraphQLFactory,
    @Inject('PrismaBinding') private prismaBinding,
  ) {}

  configureGraphQL(app: any) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql')
    const schema = this.graphQLFactory.createSchema({ typeDefs })
    const prisma = this.prismaBinding
    const server = new ApolloServer({
      schema,
      context: req => ({
        ...req,
        prisma,
      }),
    })
    server.applyMiddleware({ app })
  }
}
