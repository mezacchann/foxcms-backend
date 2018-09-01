import { NestModule, Module, Inject, MiddlewareConsumer } from '@nestjs/common'
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql'
import { UserModule } from './user/UserModule'
import { ContentTypeModule } from './content-type/ContentTypeModule'
import { PrismaModule } from './prisma/PrismaModule'
import { AuthModule } from './auth/AuthModule'
import { ProjectModule } from './project/ProjectModule'

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./src/**/*.graphql'],
      context: request => ({
        ...request,
      }),
    }),
    UserModule,
    ContentTypeModule,
    PrismaModule,
    ProjectModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  constructor(
    private readonly graphQLFactory: GraphQLFactory,
    @Inject('PrismaBinding') private prismaBinding,
  ) {}
  configure(consumer: MiddlewareConsumer) {}
}
