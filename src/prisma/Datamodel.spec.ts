import Datamodel from './Datamodel'
import { ContentTypeFieldType } from '../content-type/ContentTypeFieldType'
const modelTemplate =
  'type article{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}type article2{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}type article3{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}type article4{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}'

describe('addType', () => {
  it('should add types to the model', () => {
    const datamodel = new Datamodel('')
    let model = datamodel.addType('article')
    expect(model).toBe(
      'type article{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}',
    )
    model = datamodel.addType('book')
    expect(model).toBe(
      'type article{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}type book{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}',
    )
  })

  it('should throw an error when adding an existent type', () => {
    const datamodel = new Datamodel('')
    datamodel.addType('article')
    datamodel.addType('article2')
    datamodel.addType('article3')
    expect(() => datamodel.addType('article2')).toThrow()
  })
  it('should throw an error if invalid name was provided', () => {
    const datamodel = new Datamodel('')
    expect(() => datamodel.addType('')).toThrow()
    expect(() => datamodel.addType('1article')).toThrow()
    expect(() => datamodel.addType('arti cle')).toThrow()
    expect(() => datamodel.addType(' article')).toThrow()
    expect(() => datamodel.addType('!article')).toThrow()
    expect(() => datamodel.addType('article$')).toThrow()
    expect(() => datamodel.addType('art^icle')).toThrow()
  })
})

describe('addField', () => {
  it('should add fields to the model', () => {
    const datamodel = new Datamodel(modelTemplate)
    expect(datamodel.addField('article3', 'name', ContentTypeFieldType.Text, false)).toBe(
      'type article{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}type article2{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}type article3{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!,name:String}type article4{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}',
    )
    expect(datamodel.addField('article2', 'price', ContentTypeFieldType.Float, true)).toBe(
      'type article{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}type article2{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!,price:Float!}type article3{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!,name:String}type article4{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}',
    )
    expect(
      datamodel.addField('article4', 'available', ContentTypeFieldType.Checkbox, true),
    ).toBe(
      'type article{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}type article2{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!,price:Float!}type article3{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!,name:String}type article4{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!,available:Boolean!}',
    )
    expect(
      datamodel.addField('article2', 'description', ContentTypeFieldType.Text, false),
    ).toBe(
      'type article{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}type article2{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!,price:Float!,description:String}type article3{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!,name:String}type article4{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!,available:Boolean!}',
    )
  })
  it('should throw an error if type doesnt exist', () => {
    const datamodel = new Datamodel(modelTemplate)
    expect(() =>
      datamodel.addField('article5', 'name', ContentTypeFieldType.Text, false),
    ).toThrow()
  })
  it('should throw an error if name is invalid', () => {
    const datamodel = new Datamodel(modelTemplate)
    expect(() =>
      datamodel.addField('article4', '1name', ContentTypeFieldType.Text, false),
    ).toThrow()
    expect(() =>
      datamodel.addField('article4', 'na me', ContentTypeFieldType.Text, false),
    ).toThrow()
  })
  it('should throw an error if field already exist', () => {
    const datamodel = new Datamodel(modelTemplate)
    datamodel.addField('article4', 'name', ContentTypeFieldType.Text, false)
    expect(() =>
      datamodel.addField('article4', 'name', ContentTypeFieldType.Text, false),
    ).toThrow()
    expect(() =>
      datamodel.addField('article', 'id', ContentTypeFieldType.Text, false),
    ).toThrow()
    expect(() =>
      datamodel.addField('article2', 'createdAt', ContentTypeFieldType.Text, false),
    ).toThrow()
  })
})

describe('deleteType', () => {
  it('should delete types from model', () => {
    const datamodel = new Datamodel(modelTemplate)
    expect(datamodel.deleteType('article2')).toBe(
      'type article{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}type article3{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}type article4{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}',
    )
    expect(datamodel.deleteType('article')).toBe(
      'type article3{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}type article4{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}',
    )
    expect(datamodel.deleteType('article4')).toBe(
      'type article3{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}',
    )
  })
  it('should throw an error if type doesnt exist', () => {
    const datamodel = new Datamodel(modelTemplate)
    expect(() => datamodel.deleteType('article20')).toThrow()
  })
})

describe('deleteField', () => {
  it('should delete fields from type', () => {
    const datamodel = new Datamodel(modelTemplate)
    expect(datamodel.deleteField('article', 'updatedAt')).toBe(
      'type article{id: ID! @unique,createdAt: DateTime!}type article2{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}type article3{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}type article4{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}',
    )
    expect(datamodel.deleteField('article2', 'id')).toBe(
      'type article{id: ID! @unique,createdAt: DateTime!}type article2{createdAt: DateTime!,updatedAt: DateTime!}type article3{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}type article4{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}',
    )
    expect(datamodel.deleteField('article3', 'updatedAt')).toBe(
      'type article{id: ID! @unique,createdAt: DateTime!}type article2{createdAt: DateTime!,updatedAt: DateTime!}type article3{id: ID! @unique,createdAt: DateTime!}type article4{id: ID! @unique,createdAt: DateTime!,updatedAt: DateTime!}',
    )
  })
  it('should throw an error if type doesnt exist', () => {
    const datamodel = new Datamodel(modelTemplate)
    expect(() => datamodel.deleteType('article20')).toThrow()
  })
})
