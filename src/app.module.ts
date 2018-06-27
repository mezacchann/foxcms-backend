import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { graphqlExpress } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { UserModule } from './user/UserModule';
import expressPlayground from 'graphql-playground-middleware-express';

@Module({
  imports: [GraphQLModule, UserModule],
})
export class AppModule implements NestModule {
  constructor(private readonly graphQLFactory: GraphQLFactory) {}

  configure(consumer: MiddlewareConsumer) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });

    consumer
      .apply(expressPlayground({ endpoint: '/graphql' }))
      .forRoutes('/playground')
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes('/graphql');
  }
}
