import { Module, Logger } from '@nestjs/common'
import { remoteSchema } from './remoteSchema.provider'
import { endpointProvider } from './endpoint.provider'
import { PrismaDataModel } from './PrismaDataModel'
import { prismaBinding } from './prismaBinding.provider'

@Module({
  providers: [remoteSchema, endpointProvider, PrismaDataModel, prismaBinding],
  exports: [remoteSchema, endpointProvider, PrismaDataModel, prismaBinding],
})
export class PrismaModule {}
