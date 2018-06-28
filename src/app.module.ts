import { Module, Inject, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { graphqlExpress } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { UserModule } from './user/UserModule';
import expressPlayground from 'graphql-playground-middleware-express';
import { mergeSchemas } from 'graphql-tools';
import { remoteSchema } from './remoteSchema.provider';
import { GraphQLSchema } from 'graphql';

@Module({
  imports: [GraphQLModule, UserModule],
  providers: [remoteSchema],
})
export class AppModule implements NestModule {
  constructor(
    private readonly graphQLFactory: GraphQLFactory,
    @Inject('PrismaSchema') private readonly remoteSchema: GraphQLSchema,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths(
      './src/**/*.graphql',
    );
    const schema = this.graphQLFactory.createSchema({ typeDefs });
    const mergedSchema = mergeSchemas({ schemas: [schema, this.remoteSchema] });
    consumer
      .apply(expressPlayground({ endpoint: '/graphql' }))
      .forRoutes('/playground')
      .apply(graphqlExpress(req => ({ schema: mergedSchema, rootValue: req })))
      .forRoutes('/graphql');
  }
}
