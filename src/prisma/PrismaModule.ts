import { Module, Logger } from '@nestjs/common';
import { remoteSchema } from './remoteSchema.provider';
import { dataModels } from './dataModels.provider';
import { PrismaDataModel } from './PrismaDataModel';

@Module({
  providers: [remoteSchema, ...dataModels, PrismaDataModel, Logger],
  exports: [remoteSchema, PrismaDataModel],
})
export class PrismaModule {}
