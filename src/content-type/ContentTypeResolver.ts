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
}
