import { Prisma } from 'prisma-binding'
import { ConfigService } from '../config/ConfigService'

export const prismaBinding = {
  provide: 'PrismaBinding',
  inject: [ConfigService],
  useFactory: (configService: ConfigService): Prisma => {
    return new Prisma({
      typeDefs: './prisma/generated/prisma.graphql',
      endpoint: configService.prismaServer,
      secret: configService.foxCmsSecret,
    })
  },
}
