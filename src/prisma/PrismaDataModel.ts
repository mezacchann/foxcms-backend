import { Injectable, Inject } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';

const appendFile = util.promisify(fs.appendFile);
@Injectable()
export class PrismaDataModel {
  private static readonly datamodelPath = './prisma/datamodel.graphql';
  constructor(@Inject('PrismaDatamodel') private readonly dataModel: Buffer) {}

  async addType(contentTypeName: string) {
    const typeTemplate = `
    type ${contentTypeName} {
      id: ID! @unique
    }
        `;

    appendFile(PrismaDataModel.datamodelPath, typeTemplate);
  }
}
