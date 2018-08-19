import { Resolver, Mutation, Query } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ContentType } from './ContentType'

@Resolver('ContentType')
@UseGuards(AuthGuard('jwt'))
export class ContentTypeResolver {
  constructor() {}

  @Query()
  contentType(obj, { id }, context, info): Promise<ContentType> {
    return context.prisma.query.contentType(
      {
        where: {
          id,
        },
      },
      info,
    )
  }
}
