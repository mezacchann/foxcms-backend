import { Prisma } from 'prisma-binding'

export const prismaBinding = {
  provide: 'PrismaBinding',
  useFactory: async () => {
    return new Prisma({
      typeDefs: './prisma/generated/prisma.graphql',
      endpoint: process.env.PRISMA_SERVER_ENDPOINT,
    })
  },
}
