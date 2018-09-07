import * as jwt from 'jsonwebtoken'
import { ConfigService } from '../config/ConfigService'

export const prismaManagementToken = {
  provide: 'PrismaManagementToken',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return jwt.sign({ grants: [{ target: '*/*', action: '*' }] }, configService.foxCmsSecret, {
      expiresIn: '2y',
    })
  },
}
