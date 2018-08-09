import { Injectable, Inject } from '@nestjs/common'
import { PrismaDataModel } from './../prisma/PrismaDataModel'
import { request } from 'graphql-request'
import { Project } from '../project/Project'

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
