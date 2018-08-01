import { Resolver, Query, Mutation } from '@nestjs/graphql'
import { ContentTypeService } from './ContentTypeService'
import {
  NotAcceptableException,
  ConflictException,
} from '../../node_modules/@nestjs/common'

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
  async addContentTypeFields(obj, args, context, info) {
    const { contentTypeFields } = args
    const newContentTypeFields: any[] = new Array()

    if (!this.contentTypeService.fieldsAreWithinSameType(contentTypeFields)) {
      throw new NotAcceptableException(
        'All content type fields must belong to the same content type',
      )
    }
    if (this.contentTypeService.fieldsWithDuplicateNames(contentTypeFields)) {
      throw new ConflictException(
        'Content type may not contain fields with the same name',
      )
    }

    await this.contentTypeService.addContentTypeFields(contentTypeFields)
    args.contentTypeFields.forEach(contentTypeField => {
      const {
        contentTypeId,
        fieldName,
        fieldType,
        isRequired,
      } = contentTypeField

      newContentTypeFields.push(
        context.prisma.mutation.createContentTypeField(
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
        ),
      )
    })

    return newContentTypeFields
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
