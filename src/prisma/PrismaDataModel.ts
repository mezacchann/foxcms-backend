import {
  Injectable,
  Inject,
  Logger,
  ConflictException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common'
import { writeFileSync } from 'fs'
import outdent from 'outdent'
import { spawnSync } from 'child_process'
import { request } from 'graphql-request'
import { encode } from 'base-64'
import ContentTypeField from '../content-type/ContentTypeField'
@Injectable()
export class PrismaDataModel {
  private readonly logger = new Logger(PrismaDataModel.name, true)
  private readonly customTypeToDataType = {
    String: 'String',
    Text: 'String',
    Int: 'Int',
    Float: 'Float',
    Checkbox: 'Boolean',
    Date: 'DateTime',
    Json: 'Json',
  }
  private datamodelCache: string

  constructor(
    @Inject('DynamicModel') private content: string,
    @Inject('PrismaEndpoint') private prismaEndpoint: string,
    @Inject('DynamicModelPath') private contentTypeDataModelPath: string,
  ) {}

  addType(typeName: string) {
    if (this.typeExists(typeName)) {
      throw new ConflictException(`Type ${typeName} already exists`)
    }
    if (/\s/.test(typeName)) {
      throw new NotAcceptableException(
        'Type name may not contain any whitespaces',
      )
    }
    this.addTypeToDatamodel(typeName)
    this.logger.log(`Added and deployed new content type ${typeName}`)
  }

  addField(
    contentTypeName: string,
    fieldName: string,
    fieldType: any,
    isRequired: boolean,
  ) {
    if (!this.typeExists(contentTypeName))
      throw new NotFoundException(
        `Cannot add Field. Type ${contentTypeName} doesn't exist`,
      )
    if (this.fieldExistsWithinType(contentTypeName, fieldName))
      throw new ConflictException(
        `Field ${fieldName} exists already within type ${contentTypeName}`,
      )
    const newDatamodel = this.addFieldToDatamodel(
      contentTypeName,
      fieldName,
      this.customTypeToDataType[fieldType],
      isRequired,
    )
    this.updateModel(newDatamodel)
  }

  addFields(contentTypeFields: ContentTypeField[]) {
    let newDatamodel
    this.datamodelCache = String(this.content)
    contentTypeFields.forEach(contentTypeField => {
      if (!this.typeExists(contentTypeField.contentTypeName)) {
        this.updateLocalModel(this.datamodelCache)
        throw new NotFoundException(
          `Cannot add Field. Type ${
            contentTypeField.contentTypeName
          } doesn't exist`,
        )
      }
      if (
        this.fieldExistsWithinType(
          contentTypeField.contentTypeName,
          contentTypeField.fieldName,
        )
      ) {
        this.updateLocalModel(this.datamodelCache)
        throw new ConflictException(
          `Field ${contentTypeField.fieldName} exists already within type ${
            contentTypeField.contentTypeName
          }`,
        )
      }
      newDatamodel = this.addFieldToDatamodel(
        contentTypeField.contentTypeName,
        contentTypeField.fieldName,
        this.customTypeToDataType[contentTypeField.fieldType],
        contentTypeField.isRequired,
      )
      this.updateLocalModel(newDatamodel)
    })
    this.updateModel(newDatamodel)
  }

  private addTypeToDatamodel(typeName: string) {
    const typeTemplate = outdent`
    type ${typeName} {
      id: ID! @unique
    }`
    if (this.content !== '') this.content += '\n'
    this.updateModel(this.content + typeTemplate)
  }

  private updateModel(content: string) {
    this.deploy()
    this.updateRemoteModel(content)
    this.updateLocalModel(content)
  }

  private updateLocalModel(content: string) {
    this.content = content
    writeFileSync(this.contentTypeDataModelPath, content)
  }

  private async updateRemoteModel(content: string) {
    const query = `mutation {
      updateConfiguration(where: {name: "dynamicModel"}, data: {value: "${encode(
        content,
      )}"}) {
        value
      }
    }`
    await request(this.prismaEndpoint, query)
  }

  private addFieldToDatamodel(
    contentTypeName: string,
    fieldName: string,
    fieldType: any,
    isRequired: boolean,
  ): string {
    const matchedType = this.content.match(
      `type\\\s${contentTypeName}\\\s*\\{[^{}]*`,
    )[0]
    const idx = this.content.indexOf(matchedType) + matchedType.length
    const result =
      this.content.slice(0, idx) +
      `  ${fieldName}: ${fieldType}${isRequired ? '!' : ''}\n` +
      this.content.slice(idx)
    return result
  }

  deleteType(contentTypeName: string) {
    if (!this.typeExists(contentTypeName))
      throw new Error(`Type ${contentTypeName} doesn't exists`)
    const regex = new RegExp(`type\\\s*${contentTypeName}\\\s*\\{[^{}]*\\}\\\s`)
    this.updateModel(this.content.replace(regex, ''))
  }

  deleteContentTypeField(contentTypeName: string, fieldName: string) {
    if (!this.typeExists(contentTypeName))
      throw new NotFoundException(`Type ${contentTypeName} doesn't exists`)
    if (!this.fieldExistsWithinType(contentTypeName, fieldName))
      throw new NotFoundException(
        `Field ${fieldName} doesn't exist within type ${contentTypeName}`,
      )
    const regex = new RegExp(`type.*${contentTypeName}\\\s*\\{[^{}]*\\}`)
    const matchedContent = this.content.match(regex)[0]
    const typeWithRemovedField = matchedContent.replace(
      new RegExp(`[^\S\r\n]*${fieldName}.*\n`),
      '',
    )
    this.updateModel(this.content.replace(matchedContent, typeWithRemovedField))
  }

  private fieldExistsWithinType(typeName: string, fieldName: string) {
    const regex = new RegExp(`type.*${typeName}.*{([^}]+)}`)
    const result = this.content.match(regex)
    return result[0].indexOf(fieldName) > -1
  }

  private typeExists(typeName: string): boolean {
    const regex = new RegExp(`type.*${typeName}.*{`)
    const result = this.content.match(regex)
    return result !== null
  }

  getContent(): string {
    return this.content
  }

  deploy() {
    const res = spawnSync('node_modules/.bin/prisma', ['deploy', 'f'])
  }
}
