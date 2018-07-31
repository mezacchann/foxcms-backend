import { Resolver, Query, Mutation } from '@nestjs/graphql'
import { ContentTypeService } from './ContentTypeService'

@Resolver('ContentType')
export class ContentTypeResolver {
  constructor(private readonly contentTypeService: ContentTypeService) {}

  @Mutation()
  addContentType(obj, { contentTypeName, description }, context, info) {
    this.contentTypeService.addContentType(contentTypeName)
    return context.prisma.mutation.createContentType(
      {
        data: {
          name: contentTypeName,
          description,
        },
      },
      info,
    )
  }

  @Mutation()
  async addContentTypeField(obj, args, context, info) {
    const { contentTypeId, fieldName, fieldType, isRequired } = args
    await this.contentTypeService.addContentTypeField(
      contentTypeId,
      fieldName,
      fieldType,
      isRequired,
    )
    return context.prisma.mutation.createContentTypeField(
      {
        data: {
          contentType: {
            connect: {
              id: contentTypeId,
            },
          },
          name: fieldName,
          type: fieldType,
          isRequired,
        },
      },
      info,
    )
  }

  @Mutation()
  removeContentType(obj, args, context, info) {
    const { contentTypeName } = args
    this.contentTypeService.deleteContentType(contentTypeName)
    return context.prisma.mutation.deleteContentType(
      {
        where: {
          name: contentTypeName,
        },
      },
      info,
    )
  }

  @Mutation()
  async removeContentTypeField(obj, args, context, info) {
    const { fieldId } = args
    this.contentTypeService.deleteContentTypeField(fieldId)
    return context.prisma.mutation.deleteContentTypeField(
      {
        where: {
          id: fieldId,
        },
      },
      info,
    )
  }
}
