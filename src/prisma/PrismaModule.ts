import { Module, Logger } from '@nestjs/common';
import { remoteSchema } from './remoteSchema.provider';
import { dataModels } from './dataModels.provider';
import { PrismaDataModel } from './PrismaDataModel';

const endpointProvider = {
  provide: 'PrismaEndpoint',
  useValue: 'https://us1.prisma.sh/waldemar-penner-1ce42e/cms/dev',
};

@Module({
  providers: [remoteSchema, ...dataModels, endpointProvider, PrismaDataModel, Logger],
  exports: [remoteSchema, endpointProvider, PrismaDataModel],
})
export class PrismaModule {}
