import { Injectable, Inject } from '@nestjs/common';
import { PrismaDataModel } from './../prisma/PrismaDataModel';
import { ContextCreator } from '@nestjs/core/helpers/context-creator';

@Injectable()
export class ContentTypeService {
  constructor(
    @Inject('PrismaDataModel')
    private readonly prismaDataModel: PrismaDataModel,
  ) {}

  async addContentType(contentTypeName: string) {
    await this.prismaDataModel.addType(contentTypeName);
  }
}
