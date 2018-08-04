import * as util from 'util'
import * as fs from 'fs'
import { request } from 'graphql-request'

export const dataModels = [
  {
    provide: 'DynamicModel',
    useFactory: async (prismaEndpoint: string, dynamicModelPath: string) => {
      const query = `{
          configuration(where: {name: "dynamicModel"}) {
            value
          }
        }`
      const queryResult = (await request(prismaEndpoint, query)) as any
      if (queryResult.configuration === null) {
        const datamodel = fs
          .readFileSync('./prisma/datamodel.graphql', 'utf-8')
          .replace(/\r?\n|\r/g, '')
        const mutation = `mutation {
          createConfiguration(data: {name: "dynamicModel", value: "${datamodel}"}) {
            name
          }
        }
        `
        await request(prismaEndpoint, mutation)
      } else {
        const modelContent = queryResult.configuration.value
        return { content: modelContent }
      }
      return ''
    },
    inject: ['PrismaEndpoint', 'DynamicModelPath'],
  },
]
