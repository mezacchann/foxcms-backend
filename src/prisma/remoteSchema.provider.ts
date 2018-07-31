import { HttpLink } from 'apollo-link-http'
import { introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools'
import fetch from 'node-fetch'
import { printSchema } from 'graphql'
import { RemoteSchema } from './RemoteSchema'

export const remoteSchema = {
  provide: 'PrismaSchema',
  useFactory: async (prismaEndpoint: string) => {
    const link = new HttpLink({ uri: prismaEndpoint, fetch })
    const schema = await introspectSchema(link)
    const executableSchema = makeRemoteExecutableSchema({
      schema,
      link,
    })
    return new RemoteSchema(printSchema(executableSchema), executableSchema)
  },
  inject: ['PrismaEndpoint'],
}
