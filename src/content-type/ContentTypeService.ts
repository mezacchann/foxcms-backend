import { Injectable, Inject } from '@nestjs/common'
import { PrismaDataModel } from './../prisma/PrismaDataModel'
import { request } from 'graphql-request'

@Injectable()
export class ContentTypeService {
  constructor(
    @Inject('PrismaEndpoint') private readonly prismaEndpoint: string,
    @Inject('PrismaDataModel')
    private readonly prismaDataModel: PrismaDataModel,
  ) {}

  addContentType(contentTypeName: string) {
    this.prismaDataModel.addType(contentTypeName)
  }

  async addContentTypeField(
    contentTypeId: number,
    fieldName: string,
    fieldType: any,
    isRequired: boolean,
  ) {
    const contentTypeName = await this.resolveContentTypeName(contentTypeId)
    this.prismaDataModel.addField({
      contentTypeName,
      fieldName,
      fieldType,
      isRequired,
    })
  }

  private async resolveContentTypeName(contentTypeId: number) {
    const query = `{
      contentType(where: {id: "${contentTypeId}"}) {
        name
      }
    }`
    const queryResult = await request(this.prismaEndpoint, query)
    if ((queryResult as any).contentType == null) {
      throw new Error(`Content type with id ${contentTypeId} is not existing`)
    }
    const contentTypeName = (queryResult as any).contentType.name
    return contentTypeName
  }

  async deleteContentType(contentTypeId: number) {
    const contentTypeName = await this.resolveContentTypeName(contentTypeId)
    this.prismaDataModel.deleteType(contentTypeName)
  }

  async updateContentType(
    contentTypeId: number,
    name: string,
    description: string,
  ) {
    const contentTypeName = await this.resolveContentTypeName(contentTypeId)
    if (contentTypeName !== name) {
      this.prismaDataModel.updateContentTypeName(contentTypeName, name)
    }
  }

  async deleteContentTypeField(fieldId: string) {
    const query = `{
      contentTypeFields(where: {id: "${fieldId}"}) {
        name,
        contentType {
          name
        }
      }
    }`

    const queryResult = (await request(this.prismaEndpoint, query)) as any
    this.prismaDataModel.deleteContentTypeField(
      queryResult.contentTypeFields[0].contentType.name,
      queryResult.contentTypeFields[0].name,
    )
  }
}
