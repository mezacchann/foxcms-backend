import { Injectable, Inject } from '@nestjs/common'
import { ContentTypeField } from './ContentTypeField'
import { User, Prisma } from '../typings/prisma'

@Injectable()
export class ContentTypeService {
  constructor(@Inject('PrismaBinding') private prismaBinding: Prisma) {}

  async getContentType(id: string, user: User, info: any = '{id}') {
    const types = await this.prismaBinding.query.contentTypes(
      {
        where: {
          AND: { project: { user: { id: user.id } }, id },
        },
      },
      info,
    )
    return types[0]
  }

  getContentTypeField(id: number, info: any = '{id}'): Promise<ContentTypeField> {
    return this.prismaBinding.query.contentTypeField(
      {
        where: {
          id,
        },
      },
      info,
    )
  }
}
