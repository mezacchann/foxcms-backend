import { Injectable, Inject, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';
import { spawn } from 'child-process-promise';
import outdent from 'outdent';

const appendFile = util.promisify(fs.appendFile);
const readFile = util.promisify(fs.readFile);

@Injectable()
export class PrismaDataModel {
  private static readonly contentTypeDataModel = './prisma/contentTypes.graphql';
  private readonly logger = new Logger(PrismaDataModel.name, true);
  constructor(
    @Inject('PrismaDatamodel') private readonly dataModel: Buffer,
    @Inject('ContentTypesDatamodel') private contentTypeDataModel: Buffer,
  ) {}

  async addType(typeName: string) {
    if (this.typeExists(typeName)) throw new Error('Type already exists');
    try {
      await this.addTypeToDatamodel(typeName);
      await this.deploy();
      await this.reloadDatamodel();
      this.logger.log(`Added and deployed new content type ${typeName}`);
    } catch (err) {
      this.logger.error(err);
      throw new Error('Type cannot be added');
    }
  }

  private async addTypeToDatamodel(typeName: string) {
    const typeTemplate = outdent`\n
    type ${typeName} {
      id: ID! @unique
    }`;
    return appendFile(PrismaDataModel.contentTypeDataModel, typeTemplate);
  }

  private typeExists(typeName: string): boolean {
    const indexOfType = this.dataModel.toString().indexOf(`type ${typeName} {`);
    return indexOfType > -1 ? true : false;
  }

  private async reloadDatamodel() {
    const fileContent = await readFile(PrismaDataModel.contentTypeDataModel);
    this.contentTypeDataModel = fileContent;
  }

  private async deploy() {
    return spawn('prisma', ['deploy', 'f']);
  }
}
