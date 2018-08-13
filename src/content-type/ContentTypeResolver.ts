import { Resolver, Mutation, Query } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Resolver('ContentType')
@UseGuards(AuthGuard('jwt'))
export class ContentTypeResolver {
  constructor() {}

  @Query()
  contentType(obj, { id }, context, info) {
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
