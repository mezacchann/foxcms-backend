import { Injectable, Inject } from '@nestjs/common'

@Injectable()
export class ContentTypeService {
  constructor(@Inject('PrismaBinding') private prismaBinding) {}

  getContentType(id: number, info: string = '{id}') {
    return this.prismaBinding.query.contentType(
      {
        where: {
          id,
        },
      },
      info,
    )
  }

  getContentTypeField(id: number, info: string = '{id}') {
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
