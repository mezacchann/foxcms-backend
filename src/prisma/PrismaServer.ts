import { Injectable, Inject } from '@nestjs/common'
import { GraphQLClient } from 'graphql-request'
import { DeployPayload, AddProjectMutation } from '../typings/managementApiTypes'
import Datamodel from './Datamodel'
import { ADD_PROJECT, DEPLOY } from './mutations'
import { ConfigService } from '../config/ConfigService'

@Injectable()
export default class PrismaServer {
  constructor(
    @Inject('ManagementApiClient') private readonly managementApiClient: GraphQLClient,
    private readonly configService: ConfigService,
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
      secrets: this.configService.foxCmsSecret + projectName,
    })
    const deployPayload = deploy as DeployPayload
    if (deployPayload.errors.length > 0) {
      throw new Error(`Cannot deploy datamodel: ${deployPayload.errors[0].description}`)
    }
    return deployPayload
  }
}
