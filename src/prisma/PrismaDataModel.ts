import { Injectable, Inject, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';
import { spawn } from 'child-process-promise';
import outdent from 'outdent';

const appendFile = util.promisify(fs.appendFile);
const readFile = util.promisify(fs.readFile);

@Injectable()
export class PrismaDataModel {
  private static readonly datamodelPath = './prisma/datamodel.graphql';
  constructor(@Inject('PrismaDatamodel') private dataModel: Buffer, private readonly logger: Logger) {}

  async addType(typeName: string) {
    if (this.typeExists(typeName)) throw new Error('Type already exists');
    try {
      await this.addTypeToDatamodel(typeName);
      await this.deploy();
      await this.reloadDatamodel();
    } catch(err) {
      this.logger.error(err);
      throw new Error('Type cannot be added');
    }
  }

  private async addTypeToDatamodel(typeName: string) {
    const typeTemplate = outdent`\n
    type ${typeName} {
      id: ID! @unique
    }`;
    return appendFile(PrismaDataModel.datamodelPath, typeTemplate);
  }

  private typeExists(typeName: string): boolean {
    const indexOfType = this.dataModel.toString().indexOf(`type ${typeName} {`);
    return indexOfType > -1 ? true : false;
  }

  private async reloadDatamodel() {
    const fileContent = await readFile(PrismaDataModel.datamodelPath);
    this.dataModel = fileContent;
  }

  private async deploy() {
    return spawn('prisma', ['deploy', 'f']);
  }
}
