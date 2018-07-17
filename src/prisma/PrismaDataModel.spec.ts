import { dataModels } from './dataModels.provider';
import { PrismaDataModel } from './PrismaDataModel';
import { Test } from '@nestjs/testing';
import { readFileSync, writeFileSync } from 'fs';

describe('PrismaDataModel', () => {
  let prismaDataModel: PrismaDataModel;
  const contentTypeDataModelPath = './test/resources/contentTypes.graphql.txt';
  let initialDatamodelContent: Buffer;

  beforeAll(() => {
    initialDatamodelContent = readFileSync(contentTypeDataModelPath);
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PrismaDataModel,
        {
          provide: 'DynamicModelPath',
          useValue: contentTypeDataModelPath,
        },
        {
          provide: 'ContentTypesDatamodel',
          useValue: '',
        },
        {
          provide: 'DynamicModel',
          useValue: '',
        },
        {
          provide: 'PrismaEndpoint',
          useValue: 'dummyEndpoint',
        },
      ],
    }).compile();

    prismaDataModel = module.get<PrismaDataModel>(PrismaDataModel);
    jest.spyOn(prismaDataModel, 'updateRemoteModel').mockImplementation(() => '');
    jest.spyOn(prismaDataModel, 'deploy').mockImplementation(() => '');
  });

  describe('Add a new content type to the data model', () => {
    it('Should add a new type to the data model', () => {
      prismaDataModel.addType('photo');
      const expectedContent = readFileSync(
        './test/resources/contentTypes.addType.graphql.txt',
      );
      expect(prismaDataModel.getContent()).toBe(expectedContent.toString());
    });

    it('Should throw an error when adding the same content type twice', () => {
      prismaDataModel.addType('photo');
      expect(() => prismaDataModel.addType('photo')).toThrow();
    });

    it('Should throw an error when the type name contains a whitespace', () => {
      expect(() => prismaDataModel.addType('pho to')).toThrow();
    });
  });

  describe('Add a new field to a content type', () => {
    it('Should add new fields to a content type', () => {
      prismaDataModel.addType('photo');
      prismaDataModel.addField('photo', 'width', 'Number', true);
      prismaDataModel.addField('photo', 'height', 'Number', true);
      prismaDataModel.addField('photo', 'size', 'Number', false);
      prismaDataModel.addField('photo', 'uri', 'String', true);
      const expectedContent = readFileSync(
        './test/resources/contentTypes.addField.graphql.txt',
      );
      expect(prismaDataModel.getContent()).toBe(expectedContent.toString());
    });

    it('Should throw an error when adding a field to a not existent content type', () => {
      expect(() =>
        prismaDataModel.addField('photo', 'uri', 'String', true),
      ).toThrowError();
    });

    it('Should throw an error when adding a field with the same name to the same content type', () => {
      prismaDataModel.addType('photo');
      prismaDataModel.addField('photo', 'width', 'Number', true);
      expect(() =>
        prismaDataModel.addField('photo', 'width', 'String', true),
      ).toThrow();
    });
  });

  describe('Delete a content type from the data model', () => {
    it('Delete the content type from the data model', () => {
      prismaDataModel.addType('photo');
      prismaDataModel.addType('photo2');
      prismaDataModel.addType('photo3');
      prismaDataModel.deleteType('photo2');
      const expectedContent = readFileSync(
        './test/resources/contentTypes.deleteType.graphql.txt',
      );
      expect(prismaDataModel.getContent()).toBe(expectedContent.toString());
    });

    it('Should throw an error when deleting an not existent content type', () => {
      prismaDataModel.addType('photo');
      expect(() => prismaDataModel.deleteType('photo2')).toThrow();
    });
  });

  describe('Delete a content type field from the data model', () => {
    it('Delete a content type field from the data model', () => {
      prismaDataModel.addType('photo');
      prismaDataModel.addField('photo', 'width', 'Number', true);
      prismaDataModel.addField('photo', 'height', 'Number', true);
      prismaDataModel.addField('photo', 'size', 'Number', false);
      prismaDataModel.addField('photo', 'uri', 'String', true);
      prismaDataModel.deleteContentTypeField('photo', 'height');
      prismaDataModel.deleteContentTypeField('photo', 'width');
      const expectedContent = readFileSync(
        './test/resources/contentTypes.deleteField.graphql.txt',
      );
      expect(prismaDataModel.getContent()).toBe(expectedContent.toString());
    });

    it('Throw an error when deleting an not existent content type field', () => {
      prismaDataModel.addType('photo');
      prismaDataModel.addField('photo', 'width', 'Number', true);
      prismaDataModel.addField('photo', 'height', 'Number', true);
      prismaDataModel.addField('photo', 'size', 'Number', false);
      prismaDataModel.addField('photo', 'uri', 'String', true);
      prismaDataModel.deleteContentTypeField('photo', 'height');

      expect(() =>
        prismaDataModel.deleteContentTypeField('photo', 'width2'),
      ).toThrow();
    });
  });

  afterEach(() => {
    writeFileSync(contentTypeDataModelPath, initialDatamodelContent);
  });
});
