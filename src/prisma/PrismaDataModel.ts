import { Injectable, Inject } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';
import outdent from 'outdent';

const appendFile = util.promisify(fs.appendFile);
const readFile = util.promisify(fs.readFile);
@Injectable()
export class PrismaDataModel {
  private static readonly datamodelPath = './prisma/datamodel.graphql';
  constructor(@Inject('PrismaDatamodel') private dataModel: Buffer) {}

  async addType(typeName: string) {
    if (!this.typeExists(typeName)) {
      const typeTemplate = outdent`\n
      type ${typeName} {
        id: ID! @unique
      }`;
      appendFile(PrismaDataModel.datamodelPath, typeTemplate);
    } else {
      throw new Error('Type already exists');
    }
    await this.reloadDatamodel();
  }

  private typeExists(typeName: string): boolean {
    const indexOfType = this.dataModel.toString().indexOf(`type ${typeName} {`);
    return indexOfType > -1 ? true : false;
  }

  private async reloadDatamodel() {
    const fileContent = await readFile(PrismaDataModel.datamodelPath);
    this.dataModel = fileContent;
  }
}
