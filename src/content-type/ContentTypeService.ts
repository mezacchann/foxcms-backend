import { Injectable, Inject } from '@nestjs/common';
import { PrismaDataModel } from './../prisma/PrismaDataModel';
import { request } from 'graphql-request';

@Injectable()
export class ContentTypeService {
  constructor(
    @Inject('PrismaDataModel')
    private readonly prismaDataModel: PrismaDataModel,
  ) {}

  async addContentType(contentTypeName: string) {
    await this.prismaDataModel.addType(contentTypeName);
  }

  async addContentTypeField(
    contentTypeId: number,
    fieldName: string,
    fieldType: any,
    isRequired: boolean,
  ) {
    const query = `{
      contentType(where: {id: "${contentTypeId}"}) {
        name
      }
    }`;

    const queryResult = await request('http://localhost:3000/graphql', query);
    const contentTypeName = (queryResult as any).contentType.name;
    await this.prismaDataModel.addField(
      contentTypeName,
      fieldName,
      fieldType,
      isRequired,
    );
  }

  async deleteContentType(contentTypeName: string) {
    this.prismaDataModel.deleteType(contentTypeName);
  }

  async deleteContentTypeField(fieldId: string) {
    const query = `{
      contentTypeFields(where: {id: "${fieldId}"}) {
        name,
        contentType {
          name
        }
      }
    }`;

    const queryResult = await request('http://localhost:3000/graphql', query) as any;
    this.prismaDataModel.deleteContentTypeField(
      queryResult.contentTypeFields[0].contentType.name,
      queryResult.contentTypeFields[0].name,
    );
  }
}
