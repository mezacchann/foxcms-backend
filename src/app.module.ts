import { Module } from '@nestjs/common'
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql'
import { ApolloServer } from 'apollo-server-express'
import { UserModule } from './user/UserModule'
import { ContentTypeModule } from './content-type/ContentTypeModule'
import { PrismaModule } from './prisma/PrismaModule'

@Module({
  imports: [GraphQLModule, UserModule, ContentTypeModule, PrismaModule],
})
export class AppModule {
  constructor(private readonly graphQLFactory: GraphQLFactory) {}

  configureGraphQL(app: any) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql')
    const schema = this.graphQLFactory.createSchema({ typeDefs })
    const server = new ApolloServer({ schema })
    server.applyMiddleware({ app })
  }
}
