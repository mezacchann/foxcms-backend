import { Module, Logger } from '@nestjs/common';
import { remoteSchema } from './remoteSchema.provider';
import { dataModel } from './dataModel.provider';
import { PrismaDataModel } from './PrismaDataModel';

@Module({
  providers: [remoteSchema, dataModel, PrismaDataModel, Logger],
  exports: [remoteSchema, PrismaDataModel],
})
export class PrismaModule {}
