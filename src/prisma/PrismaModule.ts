import { Module, Logger } from '@nestjs/common'
import { remoteSchema } from './remoteSchema.provider'
import { dataModels } from './dataModels.provider'
import { endpointProvider } from './endpoint.provider'
import { PrismaDataModel } from './PrismaDataModel'
import { dynamicModelPathProvider } from './dynamicModelPath.provider'
@Module({
  providers: [
    remoteSchema,
    ...dataModels,
    endpointProvider,
    dynamicModelPathProvider,
    PrismaDataModel,
    Logger,
  ],
  exports: [remoteSchema, endpointProvider, PrismaDataModel],
})
export class PrismaModule {}
