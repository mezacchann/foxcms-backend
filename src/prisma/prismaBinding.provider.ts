import { HttpLink } from 'apollo-link-http'
import { introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools'
import { Prisma } from 'prisma-binding'
import fetch from 'node-fetch'
import { printSchema } from 'graphql'

export const prismaBinding = {
  provide: 'PrismaBinding',
  useFactory: async () => {
    const link = new HttpLink({
      uri: process.env.PRISMA_SERVER_ENDPOINT,
      fetch,
    })
    const schema = await introspectSchema(link)
    const executableSchema = makeRemoteExecutableSchema({
      schema,
      link,
    })
    return new Prisma({
      typeDefs: printSchema(executableSchema),
      endpoint: process.env.PRISMA_SERVER_ENDPOINT,
    })
  },
}
