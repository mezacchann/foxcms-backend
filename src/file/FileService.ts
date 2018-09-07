import { Injectable, Inject } from '@nestjs/common'
import { Prisma, Project, User } from '../typings/prisma'

@Injectable()
export class FileService {
  constructor(@Inject('PrismaBinding') private readonly prismaBinding: Prisma) {}

  async getFile(id: string, user: User, info: string = '{id}') {
    const files = await this.prismaBinding.query.files(
      {
        where: {
          AND: [{ project: { user: { id: user.id } } }, { id }],
        },
      },
      info,
    )
    return files[0]
  }

  getFileById(id: string, info: string = '{id}') {
    return this.prismaBinding.query.file(
      {
        where: {
          id,
        },
      },
      info,
    )
  }
}
