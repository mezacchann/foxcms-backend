import { Module } from '@nestjs/common'
import { prismaBinding } from './prismaBinding.provider'
import { prismaManagementToken } from './prismaManagementToken.provider'
import { managementApiClient } from './managementApiClient.provider'
import PrismaServer from './PrismaServer'

@Module({
  providers: [prismaBinding, prismaManagementToken, managementApiClient, PrismaServer],
  exports: [prismaBinding, PrismaServer],
})
export class PrismaModule {}
