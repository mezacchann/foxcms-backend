import { Module, Inject, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { graphqlExpress } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { UserModule } from './user/UserModule';
import expressPlayground from 'graphql-playground-middleware-express';
import { mergeSchemas } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import { ContentTypeModule } from './content-type/ContentTypeModule';
import { PrismaModule } from './prisma/PrismaModule';
import { Prisma } from 'prisma-binding';

@Module({
  imports: [GraphQLModule, UserModule, ContentTypeModule, PrismaModule],
})
export class AppModule implements NestModule {
  constructor(
    private readonly graphQLFactory: GraphQLFactory,
    @Inject('PrismaSchema') private readonly remoteSchema: GraphQLSchema,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('src/**/*.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });
    const mergedSchema = mergeSchemas({ schemas: [schema, this.remoteSchema] });
    consumer
      .apply(expressPlayground({ endpoint: '/graphql' }))
      .forRoutes('/playground')
      .apply(
        graphqlExpress(req => ({
          schema: mergedSchema,
          rootValue: req,
          context: {
            ...req,
            prisma: new Prisma({
              typeDefs: 'src/generatedPrismaSchema/prisma.graphql',
              endpoint: 'http://localhost:4466',
            }),
          },
        })),
      )
      .forRoutes('/graphql');
  }
}
