import { GraphQLClient } from 'graphql-request'

export const managementApiClient = {
  provide: 'ManagementApiClient',
  inject: ['PrismaManagementToken'],
  useFactory: (prismaManagementToken: string): GraphQLClient => {
    if (!process.env.PRISMA_SERVER_ENDPOINT) {
      throw new Error('Environment variable PRISMA_SERVER_ENDPOINT is not set')
    }
    const client = new GraphQLClient(
      `${new URL(process.env.PRISMA_SERVER_ENDPOINT).origin}/management`,
      {
        headers: {
          Authorization: `Bearer ${prismaManagementToken}`,
        },
      },
    )
    return client
  },
}
