import * as util from 'util'
import * as fs from 'fs'
import { request } from 'graphql-request'
import { decode } from 'base-64'

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
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
        const mutation = `mutation {
          createConfiguration(data: {name: "dynamicModel", value: ""}) {
            name
          }
        }
        `
        await request(prismaEndpoint, mutation)
      } else {
        const modelContent = decode(queryResult.configuration.value)
        writeFile(dynamicModelPath, modelContent)
        return { content: modelContent }
      }
      return ''
    },
    inject: ['PrismaEndpoint', 'DynamicModelPath'],
  },
]
