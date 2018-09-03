import * as jwt from 'jsonwebtoken'

export const prismaManagementToken = {
  provide: 'PrismaManagementToken',
  useFactory: () => {
    if (!process.env.FOXCMS_SECRET) {
      throw new Error('Environment variable FOXCMS_SECRET is not set')
    }
    return jwt.sign({ grants: [{ target: '*/*', action: '*' }] }, process.env.FOXCMS_SECRET, {
      expiresIn: '2y',
    })
  },
}
