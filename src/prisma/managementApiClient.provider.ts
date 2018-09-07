import { GraphQLClient } from 'graphql-request'
import { ConfigService } from '../config/ConfigService'

export const managementApiClient = {
  provide: 'ManagementApiClient',
  inject: ['PrismaManagementToken', ConfigService],
  useFactory: (prismaManagementToken: string, configService: ConfigService): GraphQLClient => {
    const client = new GraphQLClient(
      `${new URL(configService.prismaServer).origin}/management`,
      {
        headers: {
          Authorization: `Bearer ${prismaManagementToken}`,
        },
      },
    )
    return client
  },
}
