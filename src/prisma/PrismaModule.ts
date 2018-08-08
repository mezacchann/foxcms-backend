import { Module, Logger } from '@nestjs/common'
import { remoteSchema } from './remoteSchema.provider'
import { endpointProvider } from './endpoint.provider'
import { PrismaDataModel } from './PrismaDataModel'
@Module({
  providers: [
    remoteSchema,
    endpointProvider,
    PrismaDataModel,
    Logger,
  ],
  exports: [remoteSchema, endpointProvider, PrismaDataModel],
})
export class PrismaModule {}
