import { PrismaDataModel } from './PrismaDataModel'
import { Test } from '@nestjs/testing'
import ContentTypeField from '../content-type/ContentTypeField'

describe('PrismaDataModel', () => {
  let prismaDataModel: PrismaDataModel

  beforeEach(async () => {
    prismaDataModel = new PrismaDataModel('')
  })

  describe('Add a new content type to the data model', () => {
    it('Should add a new type to the data model', () => {
      expect(prismaDataModel.addType('photo')).toMatchSnapshot()
    })

    it('Should throw an error when adding the same content type twice', () => {
      prismaDataModel.addType('photo')
      expect(() => prismaDataModel.addType('pho to')).toThrow()
    })

    it('Should throw an error when the type name contains a whitespace', () => {
      expect(() => prismaDataModel.addType('pho to')).toThrow()
    })

    it('Should throw an error when the type name starts with an number', () => {
      expect(() => prismaDataModel.addType('1photo')).toThrow()
    })
  })

  describe('Add a new field to a content type', () => {
    it('Should add new fields to a content type', () => {
      prismaDataModel.addType('photo')
      prismaDataModel.addField('photo', {
        name: 'width',
        type: 'Float',
        isRequired: true,
      })
      prismaDataModel.addField('photo', {
        name: 'height',
        type: 'Float',
        isRequired: true,
      })
      prismaDataModel.addField('photo', {
        name: 'size',
        type: 'Float',
        isRequired: false,
      })
      const result = prismaDataModel.addField('photo', {
        name: 'uri',
        type: 'String',
        isRequired: true,
      })
      expect(result).toMatchSnapshot()
    })

    it('Should throw an error when adding a field to a not existent content type', () => {
      expect(() =>
        prismaDataModel.addField('photo', {
          name: 'uri',
          type: 'String',
          isRequired: true,
        }),
      ).toThrowError()
    })

    it('Should throw an error when adding a field with the same name to the same content type', () => {
      prismaDataModel.addType('photo')
      prismaDataModel.addField('photo', {
        name: 'width',
        type: 'String',
        isRequired: true,
      })
      expect(() =>
        prismaDataModel.addField('photo', {
          name: 'width',
          type: 'String',
          isRequired: true,
        }),
      ).toThrow()
    })

    it('Should throw an error when the field name contains whitespaces', () => {
      prismaDataModel.addType('photo')
      expect(() =>
        prismaDataModel.addField('photo', {
          name: 'wi dth',
          type: 'String',
          isRequired: true,
        }),
      ).toThrow()
    })

    it('Should throw an error when the field name starts with a number', () => {
      prismaDataModel.addType('photo')
      expect(() =>
        prismaDataModel.addField('photo', {
          name: 'wi dth',
          type: 'String',
          isRequired: true,
        }),
      ).toThrow()
    })
  })

  describe('Delete a content type from the data model', () => {
    it('Delete the content type from the data model', () => {
      prismaDataModel.addType('photo')
      prismaDataModel.addType('photo2')
      prismaDataModel.addType('photo3')
      const result = prismaDataModel.deleteType('photo2')
      expect(result).toMatchSnapshot()
    })

    it('Should throw an error when deleting an not existent content type', () => {
      prismaDataModel.addType('photo')
      expect(() => prismaDataModel.deleteType('photo2')).toThrow()
    })
  })

  describe('Update a content type', () => {
    it('Update the content type name', () => {
      prismaDataModel.addType('photo')
      prismaDataModel.addType('photo2')
      prismaDataModel.addType('photo3')
      const result = prismaDataModel.updateContentTypeName(
        'photo2',
        'photo2_NEWNAME',
      )
      expect(result).toMatchSnapshot()
    })

    it('Should throw an error when updating with an invalid name', () => {
      prismaDataModel.addType('photo')
      expect(() =>
        prismaDataModel.updateContentTypeName('photo', 'pho to'),
      ).toThrow()
      expect(() =>
        prismaDataModel.updateContentTypeName('photo', '1photo'),
      ).toThrow()
    })

    it('Should throw an error when trying to update an not existent type', () => {
      prismaDataModel.addType('photo')
      expect(() =>
        prismaDataModel.updateContentTypeName('photo2', 'photo'),
      ).toThrow()
    })
  })

  describe('Delete a content type field from the data model', () => {
    it('Delete a content type field from the data model', () => {
      prismaDataModel.addType('photo')
      prismaDataModel.addField('photo', {
        name: 'width',
        type: 'Float',
        isRequired: true,
      })
      prismaDataModel.addField('photo', {
        name: 'height',
        type: 'Float',
        isRequired: true,
      })
      prismaDataModel.addField('photo', {
        name: 'size',
        type: 'Float',
        isRequired: false,
      })
      prismaDataModel.addField('photo', {
        name: 'uri',
        type: 'String',
        isRequired: true,
      })
      prismaDataModel.deleteContentTypeField('photo', 'height')
      const result = prismaDataModel.deleteContentTypeField('photo', 'width')
      expect(result).toMatchSnapshot()
    })

    it('Throw an error when deleting an not existent content type field', () => {
      prismaDataModel.addType('photo')
      prismaDataModel.addField('photo', {
        name: 'width',
        type: 'Float',
        isRequired: true,
      })
      prismaDataModel.addField('photo', {
        name: 'height',
        type: 'Float',
        isRequired: true,
      })
      prismaDataModel.addField('photo', {
        name: 'size',
        type: 'Float',
        isRequired: false,
      })
      prismaDataModel.addField('photo', {
        name: 'uri',
        type: 'String',
        isRequired: true,
      })
      prismaDataModel.deleteContentTypeField('photo', 'height')

      expect(() =>
        prismaDataModel.deleteContentTypeField('photo', 'width2'),
      ).toThrow()
    })
  })
})
