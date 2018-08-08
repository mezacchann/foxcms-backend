import { Injectable, Inject } from '@nestjs/common'
import { PrismaDataModel } from './../prisma/PrismaDataModel'
import { request } from 'graphql-request'
import { Project } from '../project/Project'

@Injectable()
export class ContentTypeService {
  async addContentType(project: Project, typeName: string): Promise<string> {
    const datamodel = new PrismaDataModel(project.datamodel)
    const newDatamodel = datamodel.addType(typeName)
    await this.deploy(project.generatedName, project.stage, newDatamodel)
    return newDatamodel
  }

  private async deploy(projectName: string, stage: string, datamodel: string) {
    const mutation = `
    mutation {
      deploy(
        input: {
          name: "${projectName}"
          stage: "${stage}"
          types: "${datamodel}"
        }
      ) {
        errors {
          description
        }
      }
    }`
    const endpoint = new URL(process.env.PRISMA_SERVER_ENDPOINT)
    await request(`${endpoint.origin}/management`, mutation)
  }
  /*
  async addContentTypeField(
    contentTypeId: number,
    fieldName: string,
    fieldType: any,
    isRequired: boolean,
  ) {
    const contentTypeName = await this.resolveContentTypeName(contentTypeId)
    this.prismaDataModel.addField({
      contentTypeName,
      fieldName,
      fieldType,
      isRequired,
    })
  }

  private async resolveContentTypeName(contentTypeId: number) {
    const query = `{
      contentType(where: {id: "${contentTypeId}"}) {
        name
      }
    }`
    const queryResult = await request(this.prismaEndpoint, query)
    if ((queryResult as any).contentType == null) {
      throw new Error(`Content type with id ${contentTypeId} is not existing`)
    }
    const contentTypeName = (queryResult as any).contentType.name
    return contentTypeName
  }

  async deleteContentType(contentTypeId: number) {
    const contentTypeName = await this.resolveContentTypeName(contentTypeId)
    this.prismaDataModel.deleteType(contentTypeName)
  }

  async updateContentType(
    contentTypeId: number,
    name: string,
    description: string,
  ) {
    const contentTypeName = await this.resolveContentTypeName(contentTypeId)
    if (contentTypeName !== name) {
      this.prismaDataModel.updateContentTypeName(contentTypeName, name)
    }
  }

  async deleteContentTypeField(fieldId: string) {
    const query = `{
      contentTypeFields(where: {id: "${fieldId}"}) {
        name,
        contentType {
          name
        }
      }
    }`

    const queryResult = (await request(this.prismaEndpoint, query)) as any
    this.prismaDataModel.deleteContentTypeField(
      queryResult.contentTypeFields[0].contentType.name,
      queryResult.contentTypeFields[0].name,
    )
  }
  */
}
