import { config } from 'dotenv'
import { Prisma } from 'prisma-binding'

config({ path: './test.env' })

let prismaBinding

if (process.env.NODE_ENV === 'test') {
  prismaBinding = new Prisma({
    typeDefs: './prisma/generated/prisma.graphql',
    endpoint: process.env.PRISMA_SERVER_ENDPOINT,
    secret: process.env.FOXCMS_SECRET,
  })
}

export default prismaBinding
