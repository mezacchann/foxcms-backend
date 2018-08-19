import { Prisma } from 'prisma-binding'

export const prismaBinding = {
  provide: 'PrismaBinding',
  useFactory: (): Prisma => {
    return new Prisma({
      typeDefs: './prisma/generated/prisma.graphql',
      endpoint: process.env.PRISMA_SERVER_ENDPOINT,
      secret: process.env.FOXCMS_SECRET,
    })
  },
}
