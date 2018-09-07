import { NestModule, Module, Inject, MiddlewareConsumer, MulterModule } from '@nestjs/common'
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql'
import { graphqlExpress } from 'apollo-server-express'
import { UserModule } from './user/UserModule'
import { ContentTypeModule } from './content-type/ContentTypeModule'
import { PrismaModule } from './prisma/PrismaModule'
import { AuthModule } from './auth/AuthModule'
import { ProjectModule } from './project/ProjectModule'
import { FileModule } from './file/FileModule'
import { ConfigModule } from './config/ConfigModule'
@Module({
  imports: [
    GraphQLModule,
    UserModule,
    ContentTypeModule,
    PrismaModule,
    ProjectModule,
    AuthModule,
    FileModule,
    ConfigModule,
  ],
})
export class AppModule implements NestModule {
  constructor(
    private readonly graphQLFactory: GraphQLFactory,
    @Inject('PrismaBinding') private prismaBinding,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./src/**/*.graphql')
    const schema = this.graphQLFactory.createSchema({ typeDefs })
    const prisma = this.prismaBinding
    consumer
      .apply(
        graphqlExpress(req => ({
          schema,
          rootValue: req,
          context: request => ({
            ...request,
            prisma,
          }),
        })),
      )
      .forRoutes('/graphql')
  }
}
