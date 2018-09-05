import { Injectable, Inject } from '@nestjs/common'
import { GraphQLClient } from 'graphql-request'
import { DeployPayload, AddProjectMutation } from '../typings/managementApiTypes'
import Datamodel from './Datamodel'
import { ADD_PROJECT, DEPLOY } from './mutations'

@Injectable()
export default class PrismaServer {
  constructor(
    @Inject('ManagementApiClient') private readonly managementApiClient: GraphQLClient,
  ) {}
  addService(name: string, stage: string) {
    return this.managementApiClient.request<AddProjectMutation>(ADD_PROJECT, {
      name,
      stage,
    })
  }
  async deploy(projectName: string, stage: string, datamodel = Datamodel.DEFAULT) {
    const { deploy } = await this.managementApiClient.request<any>(DEPLOY, {
      projectName,
      stage,
      types: datamodel,
      secrets: process.env.FOXCMS_SECRET + projectName,
    })
    const deployPayload = deploy as DeployPayload
    if (deployPayload.errors.length > 0) {
      throw new Error(`Cannot deploy datamodel: ${deployPayload.errors[0].description}`)
    }
    return deployPayload
  }
}
