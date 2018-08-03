import { PrismaDataModel } from './PrismaDataModel'
import { Test } from '@nestjs/testing'
import ContentTypeField from '../content-type/ContentTypeField'

describe('PrismaDataModel', () => {
  let prismaDataModel: PrismaDataModel
  let deployFn: jest.Mock
  let updateRemoteModelFn: jest.Mock

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PrismaDataModel,
        {
          provide: 'ContentTypesDatamodel',
          useValue: '',
        },
        {
          provide: 'DynamicModel',
          useValue: { content: '' },
        },
        {
          provide: 'PrismaEndpoint',
          useValue: 'dummyEndpoint',
        },
      ],
    }).compile()

    prismaDataModel = module.get<PrismaDataModel>(PrismaDataModel)
    updateRemoteModelFn = jest
      .spyOn(prismaDataModel, 'updateRemoteModel')
      .mockImplementation(() => '')
    deployFn = jest
      .spyOn(prismaDataModel, 'deploy')
      .mockImplementation(() => '')
  })

  describe('Add a new content type to the data model', () => {
    it('Should add a new type to the data model', () => {
      prismaDataModel.addType('photo')
      expect(prismaDataModel.getContent()).toMatchSnapshot()
      expect(deployFn.mock.calls.length).toBe(1)
      expect(updateRemoteModelFn.mock.calls.length).toBe(1)
    })

    it('Should throw an error when adding the same content type twice', () => {
      prismaDataModel.addType('photo')
      expect(() => prismaDataModel.addType('pho to')).toThrow()
      expect(deployFn.mock.calls.length).toBe(1)
      expect(updateRemoteModelFn.mock.calls.length).toBe(1)
    })

    it('Should throw an error when the type name contains a whitespace', () => {
      expect(() => prismaDataModel.addType('pho to')).toThrow()
      expect(deployFn.mock.calls.length).toBe(0)
      expect(updateRemoteModelFn.mock.calls.length).toBe(0)
    })
  })

  describe('Add a new field to a content type', () => {
    it('Should add new fields to a content type', () => {
      prismaDataModel.addType('photo')
      prismaDataModel.addField({
        contentTypeName: 'photo',
        fieldName: 'width',
        fieldType: 'Float',
        isRequired: true,
      })
      prismaDataModel.addField({
        contentTypeName: 'photo',
        fieldName: 'height',
        fieldType: 'Float',
        isRequired: true,
      })
      prismaDataModel.addField({
        contentTypeName: 'photo',
        fieldName: 'size',
        fieldType: 'Float',
        isRequired: false,
      })
      prismaDataModel.addField({
        contentTypeName: 'photo',
        fieldName: 'uri',
        fieldType: 'String',
        isRequired: true,
      })
      expect(prismaDataModel.getContent()).toMatchSnapshot()
      expect(deployFn.mock.calls.length).toBe(5)
      expect(updateRemoteModelFn.mock.calls.length).toBe(5)
    })

    it('Should throw an error when adding a field to a not existent content type', () => {
      expect(() =>
        prismaDataModel.addField({
          contentTypeName: 'photo',
          fieldName: 'uri',
          fieldType: 'String',
          isRequired: true,
        }),
      ).toThrowError()
      expect(deployFn.mock.calls.length).toBe(0)
      expect(updateRemoteModelFn.mock.calls.length).toBe(0)
    })

    it('Should throw an error when adding a field with the same name to the same content type', () => {
      prismaDataModel.addType('photo')
      prismaDataModel.addField({
        contentTypeName: 'photo',
        fieldName: 'width',
        fieldType: 'String',
        isRequired: true,
      })
      expect(() =>
        prismaDataModel.addField({
          contentTypeName: 'photo',
          fieldName: 'width',
          fieldType: 'String',
          isRequired: true,
        }),
      ).toThrow()
      expect(deployFn.mock.calls.length).toBe(2)
      expect(updateRemoteModelFn.mock.calls.length).toBe(2)
    })
  })

  describe('Add new fields to a content type', () => {
    it('Should add new fields to a content type', () => {
      prismaDataModel.addType('photo')
      const contentTypeFields: ContentTypeField[] = new Array()
      contentTypeFields.push({
        contentTypeName: 'photo',
        fieldName: 'width',
        fieldType: 'Float',
        isRequired: true,
      })
      contentTypeFields.push({
        contentTypeName: 'photo',
        fieldName: 'height',
        fieldType: 'Float',
        isRequired: true,
      })
      contentTypeFields.push({
        contentTypeName: 'photo',
        fieldName: 'size',
        fieldType: 'Float',
        isRequired: false,
      })
      contentTypeFields.push({
        contentTypeName: 'photo',
        fieldName: 'uri',
        fieldType: 'String',
        isRequired: true,
      })
      prismaDataModel.addFields(contentTypeFields)
      expect(prismaDataModel.getContent()).toMatchSnapshot()
      expect(deployFn.mock.calls.length).toBe(2)
      expect(updateRemoteModelFn.mock.calls.length).toBe(2)
    })
  })

  describe('Delete a content type from the data model', () => {
    it('Delete the content type from the data model', () => {
      prismaDataModel.addType('photo')
      prismaDataModel.addType('photo2')
      prismaDataModel.addType('photo3')
      prismaDataModel.deleteType('photo2')
      expect(prismaDataModel.getContent()).toMatchSnapshot()
      expect(deployFn.mock.calls.length).toBe(4)
      expect(updateRemoteModelFn.mock.calls.length).toBe(4)
    })

    it('Should throw an error when deleting an not existent content type', () => {
      prismaDataModel.addType('photo')
      expect(() => prismaDataModel.deleteType('photo2')).toThrow()
      expect(deployFn.mock.calls.length).toBe(1)
      expect(updateRemoteModelFn.mock.calls.length).toBe(1)
    })
  })

  describe('Delete a content type field from the data model', () => {
    it('Delete a content type field from the data model', () => {
      prismaDataModel.addType('photo')
      prismaDataModel.addField({
        contentTypeName: 'photo',
        fieldName: 'width',
        fieldType: 'Float',
        isRequired: true,
      })
      prismaDataModel.addField({
        contentTypeName: 'photo',
        fieldName: 'height',
        fieldType: 'Float',
        isRequired: true,
      })
      prismaDataModel.addField({
        contentTypeName: 'photo',
        fieldName: 'size',
        fieldType: 'Float',
        isRequired: false,
      })
      prismaDataModel.addField({
        contentTypeName: 'photo',
        fieldName: 'uri',
        fieldType: 'String',
        isRequired: true,
      })
      prismaDataModel.deleteContentTypeField('photo', 'height')
      prismaDataModel.deleteContentTypeField('photo', 'width')
      expect(prismaDataModel.getContent()).toMatchSnapshot()
      expect(deployFn.mock.calls.length).toBe(7)
      expect(updateRemoteModelFn.mock.calls.length).toBe(7)
    })

    it('Throw an error when deleting an not existent content type field', () => {
      prismaDataModel.addType('photo')
      prismaDataModel.addField({
        contentTypeName: 'photo',
        fieldName: 'width',
        fieldType: 'Float',
        isRequired: true,
      })
      prismaDataModel.addField({
        contentTypeName: 'photo',
        fieldName: 'height',
        fieldType: 'Float',
        isRequired: true,
      })
      prismaDataModel.addField({
        contentTypeName: 'photo',
        fieldName: 'size',
        fieldType: 'Float',
        isRequired: false,
      })
      prismaDataModel.addField({
        contentTypeName: 'photo',
        fieldName: 'uri',
        fieldType: 'String',
        isRequired: true,
      })
      prismaDataModel.deleteContentTypeField('photo', 'height')

      expect(() =>
        prismaDataModel.deleteContentTypeField('photo', 'width2'),
      ).toThrow()
      expect(deployFn.mock.calls.length).toBe(6)
      expect(updateRemoteModelFn.mock.calls.length).toBe(6)
    })
  })
})
