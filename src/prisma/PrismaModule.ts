import { Module } from '@nestjs/common'
import { prismaBinding } from './prismaBinding.provider'
import { prismaManagementToken } from './prismaManagementToken.provider'

@Module({
  providers: [prismaBinding, prismaManagementToken],
  exports: [prismaBinding, prismaManagementToken],
})
export class PrismaModule {}
