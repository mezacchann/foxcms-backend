import * as jwt from 'jsonwebtoken'

export const prismaManagementToken = {
  provide: 'PrismaManagementToken',
  useFactory: () => {
    return jwt.sign(
      { grants: [{ target: '*/*', action: '*' }] },
      process.env.FOXCMS_SECRET,
      { expiresIn: '2y' },
    )
  },
}
