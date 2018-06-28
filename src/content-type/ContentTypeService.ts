import { Injectable, Inject } from '@nestjs/common';
import { PrismaDataModel } from './../prisma/PrismaDataModel';

@Injectable()
export class ContentTypeService {
  constructor(@Inject('PrismaDataModel') private readonly prismaDataModel: PrismaDataModel) {}

  addContentType(contentTypeName: string) {
    this.prismaDataModel.addType(contentTypeName);
  }
}
