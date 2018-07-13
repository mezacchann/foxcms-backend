import { Module, Inject, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { graphiqlExpress } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { UserModule } from './user/UserModule';
import { GraphQLSchema } from 'graphql';
import { ContentTypeModule } from './content-type/ContentTypeModule';
import { PrismaModule } from './prisma/PrismaModule';
import { ApolloMiddleware } from './ApolloMiddleware';

@Module({
  imports: [GraphQLModule, UserModule, ContentTypeModule, PrismaModule],
})
export class AppModule implements NestModule {
  constructor(
    private readonly graphQLFactory: GraphQLFactory,
    @Inject('PrismaEndpoint') private readonly prismaEndpoint: string,
    @Inject('PrismaSchema') private readonly remoteSchema: GraphQLSchema,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(graphiqlExpress({ endpointURL: '/graphql' }))
      .forRoutes('/graphi')
      .apply(ApolloMiddleware)
      .forRoutes('/graphql');
  }
}
