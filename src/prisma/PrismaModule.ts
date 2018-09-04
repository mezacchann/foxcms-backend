import { Module } from '@nestjs/common'
import { prismaBinding } from './prismaBinding.provider'
import { prismaManagementToken } from './prismaManagementToken.provider'
import { managementApiClient } from './managementApiClient.provider'

@Module({
  providers: [prismaBinding, prismaManagementToken, managementApiClient],
  exports: [prismaBinding, prismaManagementToken, managementApiClient],
})
export class PrismaModule {}
