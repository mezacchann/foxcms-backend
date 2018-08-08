import { Resolver, Query, Mutation } from '@nestjs/graphql'
import { ContentTypeService } from './ContentTypeService'

@Resolver('ContentType')
export class ContentTypeResolver {
  constructor(private readonly contentTypeService: ContentTypeService) {}

  /*
  @Mutation()
  async addContentTypeField(obj, args, context, info) {
    const {
      contentTypeId,
      fieldName,
      fieldType,
      isRequired,
    } = args.contentTypeField
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
  async removeContentType(obj, args, context, info) {
    const { contentTypeId } = args
    await this.contentTypeService.deleteContentType(contentTypeId)
    return context.prisma.mutation.deleteContentType(
      {
        where: {
          id: contentTypeId,
        },
      },
      info,
    )
  }

  @Mutation()
  async removeContentTypeField(obj, args, context, info) {
    const { fieldId } = args
    await this.contentTypeService.deleteContentTypeField(fieldId)
    return context.prisma.mutation.deleteContentTypeField(
      {
        where: {
          id: fieldId,
        },
      },
      info,
    )
  }

  @Mutation()
  async renewContentType(obj, args, context, info) {
    const { contentTypeId, name, description } = args
    await this.contentTypeService.updateContentType(
      contentTypeId,
      name,
      description,
    )
    return context.prisma.mutation.updateContentType(
      {
        where: {
          id: contentTypeId,
        },
        data: {
          name,
          description,
        },
      },
      info,
    )
  }
  */
}
