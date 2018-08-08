import { Module } from '@nestjs/common'
import { PrismaDataModel } from './PrismaDataModel'
import { prismaBinding } from './prismaBinding.provider'

@Module({
  providers: [PrismaDataModel, prismaBinding],
  exports: [PrismaDataModel, prismaBinding],
})
export class PrismaModule {}
