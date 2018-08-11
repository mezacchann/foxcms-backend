import { Module } from '@nestjs/common'
import { PrismaDataModel } from './PrismaDataModel'
import { prismaBinding } from './prismaBinding.provider'
import { prismaManagementToken } from './prismaManagementToken.provider'

@Module({
  providers: [PrismaDataModel, prismaBinding, prismaManagementToken],
  exports: [PrismaDataModel, prismaBinding, prismaManagementToken],
})
export class PrismaModule {}
