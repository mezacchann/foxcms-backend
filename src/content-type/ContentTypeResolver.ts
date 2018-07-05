import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { ContentTypeService } from './ContentTypeService';

@Resolver('ContentType')
export class ContentTypeResolver {
  constructor(private readonly contentTypeService: ContentTypeService) {}

  @Mutation()
  async addContentType(obj, { contentTypeName }, context, info) {
    await this.contentTypeService.addContentType(contentTypeName);
    return context.prisma.mutation.createContentType(
      {
        data: {
          name: contentTypeName,
        },
      },
      info,
    );
  }

  @Mutation()
  async addContentTypeField(obj, args, context, info) {
    const { contentTypeId, fieldName, fieldType, isRequired } = args;
    await this.contentTypeService.addContentTypeField(
      contentTypeId,
      fieldName,
      fieldType,
      isRequired,
    );
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
    );
  }

  @Mutation()
  async removeContentType(obj, args, context, info) {
    const { contentTypeName } = args;
    this.contentTypeService.deleteContentType(contentTypeName);
  }
}
