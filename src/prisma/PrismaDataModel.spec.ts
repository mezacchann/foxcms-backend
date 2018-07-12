import { dataModels } from './dataModels.provider';
import { PrismaDataModel } from './PrismaDataModel';
import { Test } from '@nestjs/testing';
import * as fs from 'fs';
import * as util from 'util';

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const sync = fn =>
  fn.then(res => () => res).catch(err => () => {
    throw err;
  });

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

  describe('Add a new content type to the data model', () => {
    it('Should add a new type to the data model', async () => {
      await prismaDataModel.addType('photo');
      const expectedContent = await readFile(
        './test/resources/contentTypes.addType.graphql.txt',
      );
      expect(prismaDataModel.getContentTypeDataModel().toString()).toBe(
        expectedContent.toString(),
      );
    });

    it('Should throw an error when adding the same content type twice', async () => {
      await prismaDataModel.addType('photo');
      expect(await sync(prismaDataModel.addType('photo'))).toThrow();
    });

    it('Should throw an error when the type name contains a whitespace', async () => {
      expect(await sync(prismaDataModel.addType('pho to'))).toThrow();
    });
  });

  describe('Add a new field to a content type', () => {
    it('Should add new fields to a content type', async () => {
      await prismaDataModel.addType('photo');
      await prismaDataModel.addField('photo', 'width', 'Number', true);
      await prismaDataModel.addField('photo', 'height', 'Number', true);
      await prismaDataModel.addField('photo', 'size', 'Number', false);
      await prismaDataModel.addField('photo', 'uri', 'String', true);
      const expectedContent = await readFile(
        './test/resources/contentTypes.addField.graphql.txt',
      );
      expect(prismaDataModel.getContentTypeDataModel().toString()).toBe(
        expectedContent.toString(),
      );
    });

    it('Should throw an error when adding a field to a not existent content type', async () => {
      expect(await sync(prismaDataModel.addField('photo', 'uri', 'String', true))).toThrow();
    });
  });

  afterEach(async () => {
    writeFile(contentTypeDataModelPath, initialDatamodelContent);
  });
});
