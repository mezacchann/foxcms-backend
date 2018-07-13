import {
  Injectable,
  NestMiddleware,
  MiddlewareFunction,
  Inject,
} from '@nestjs/common';
import { runHttpQuery } from 'apollo-server-core';
import { Prisma } from 'prisma-binding';
import { GraphQLFactory } from '@nestjs/graphql';
import { mergeSchemas } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import { introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools';
import { HttpLink } from 'apollo-link-http';

@Injectable()
export class ApolloMiddleware implements NestMiddleware {
  private readonly localSchema: GraphQLSchema;
  private readonly prisma: Prisma;
  private mergedSchema;
  constructor(
    private readonly graphQLFactory: GraphQLFactory,
    @Inject('PrismaSchema') private remoteSchema: GraphQLSchema,
    @Inject('PrismaEndpoint') private readonly prismaEndpoint: string,
  ) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('src/**/*.graphql');
    this.localSchema = this.graphQLFactory.createSchema({ typeDefs });
    this.mergedSchema = mergeSchemas({
      schemas: [this.localSchema, this.remoteSchema],
    });
    this.prisma = new Prisma({
      typeDefs: 'src/generatedPrismaSchema/prisma.graphql',
      endpoint: this.prismaEndpoint,
    });
  }

  async resolve(name: string): Promise<MiddlewareFunction> {
    return async (req, res, next) => {
      const options = {
        schema: this.mergedSchema,
        rootValue: req,
        context: {
          ...req,
          prisma: this.prisma,
        },
      };
      try {
        const query = req.method === 'POST' ? req.body : req.query;
        const gqlResponse = await runHttpQuery([req, res], {
          method: req.method,
          options,
          query,
        });
        if (
          query.query.search(
            '(addContentType|addContentTypeField|removeContentType|removeContentTypeField)',
          ) !== -1
        ) {
          this.reloadSchema();
        }
        res.write(gqlResponse);
        res.end();
      } catch (error) {
        if ('HttpQueryError' !== error.name) {
          return next(error);
        }
        if (error.headers) {
          Object.keys(error.headers).forEach(header => {
            res.setHeader(header, error.headers[header]);
          });
        }
        res.statusCode = error.statusCode;
        res.write(error.message);
        res.end();
      }
    };
  }

  private async reloadSchema() {
    const link = new HttpLink({ uri: this.prismaEndpoint, fetch });
    const schema = await introspectSchema(link);
    this.remoteSchema = makeRemoteExecutableSchema({
      schema,
      link,
    });
    this.mergedSchema = mergeSchemas({
      schemas: [this.localSchema, this.remoteSchema],
    });
  }
}
