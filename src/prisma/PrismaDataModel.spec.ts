import { dataModels } from './dataModels.provider';
import { PrismaDataModel } from './PrismaDataModel';
import { Test } from '@nestjs/testing';
import * as fs from 'fs';
import * as util from 'util';

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

describe('PrismaDataModel', () => {
  let prismaDataModel: PrismaDataModel;
  const contentTypeDataModelPath = './test/resources/contentTypes.graphql.txt';
  let initialDatamodelContent: Buffer;

  beforeAll(async () => {
    initialDatamodelContent = await readFile(contentTypeDataModelPath);
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PrismaDataModel,
        {
          provide: 'ContentTypeDataModelPath',
          useValue: contentTypeDataModelPath,
        },
        {
          provide: 'ContentTypesDatamodel',
          useValue: '',
        },
      ],
    }).compile();

    prismaDataModel = module.get<PrismaDataModel>(PrismaDataModel);
  });

  describe('addType', () => {
    it('should add a new type to the data model', async () => {
      await prismaDataModel.addType('photo');
      const expectedContent = await readFile('./test/resources/contentTypes.addType_1.graphql.txt');
      expect(prismaDataModel.getContentTypeDataModel().toString()).toBe(expectedContent.toString());
    });
  });

  afterEach(async () => {
    writeFile(contentTypeDataModelPath, initialDatamodelContent);
  });
});
