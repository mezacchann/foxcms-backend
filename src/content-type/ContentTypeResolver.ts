import { Resolver, Query, Mutation } from '@nestjs/graphql'
import { ContentTypeService } from './ContentTypeService'

@Resolver('ContentType')
export class ContentTypeResolver {
  constructor(private readonly contentTypeService: ContentTypeService) {}

  @Mutation()
  async addContentType(
    obj,
    { projectId, contentTypeName, description },
    context,
    info,
  ) {
    const project = await context.prisma.query.project(
      {
        where: {
          id: projectId,
        },
      },
      `{
        id
        generatedName
        stage
        datamodel
       }`,
    )
    if (!project) {
      throw new Error(`Project with id ${projectId} doesn't exist`)
    }
    const newDatamodel = await this.contentTypeService.addContentType(
      project,
      contentTypeName,
    )
    await context.prisma.mutation.updateProject(
      {
        where: {
          id: projectId,
        },
        data: {
          datamodel: newDatamodel,
        },
      },
      info,
    )
    return context.prisma.mutation.createContentType(
      {
        data: {
          name: contentTypeName,
          description,
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      },
      info,
    )
  }
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
