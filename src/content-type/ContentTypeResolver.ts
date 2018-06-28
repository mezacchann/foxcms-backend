import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { ContentTypeService } from './ContentTypeService';

@Resolver('ContentType')
export class ContentTypeResolver {
    constructor(
        private readonly contentTypeService: ContentTypeService,
    ) {}

    @Mutation()
    addContentType(obj, { contentTypeName }, context, info) {
        return this.contentTypeService.addContentType(contentTypeName);
    }
}