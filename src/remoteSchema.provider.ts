import { HttpLink } from 'apollo-link-http';
import { introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools';
import fetch from 'node-fetch';

export const remoteSchema = {
  provide: 'PrismaSchema',
  useFactory: async () => {
    const link = new HttpLink({ uri: 'http://localhost:4466', fetch });
    const schema = await introspectSchema(link);
    const executableSchema = makeRemoteExecutableSchema({
      schema,
      link,
    });
    return executableSchema;
  },
};
