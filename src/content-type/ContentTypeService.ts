import { Injectable, Inject } from '@nestjs/common'
import { Prisma } from 'prisma-binding'
import { ContentTypeField } from './ContentTypeField'
import { ContentType } from './ContentType'

@Injectable()
export class ContentTypeService {
  constructor(@Inject('PrismaBinding') private prismaBinding: Prisma) {}

  getContentType(id: number, info: any = '{id}'): Promise<ContentType> {
    return this.prismaBinding.query.contentType(
      {
        where: {
          id,
        },
      },
      info,
    )
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
