import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as supertest from 'supertest'
import { AppModule } from '../../app.module'
import { ProjectModule } from '../ProjectModule'
import { AuthModule } from '../../auth/AuthModule'
import { ContentTypeModule } from '../../content-type/ContentTypeModule'
import { Project, ContentType, ContentTypeField } from '../../typings/prisma'
import { ProjectWithToken } from '../ProjectWithToken'
import { PrismaModule } from '../../prisma/PrismaModule'
import PrismaServer from '../../prisma/PrismaServer'
import Datamodel from '../../prisma/Datamodel'
import { ConfigService } from '../../config/ConfigService'

jest.mock('../../prisma/PrismaServer')

describe('Project', () => {
  let app: INestApplication
  let project: Project
  const contentTypes: ContentType[] = []
  const contentTypeFields: ContentTypeField[] = []
  let addServiceFn: jest.Mock<any>
  let deployFn: jest.Mock<any>
  let configService: ConfigService
  let request: supertest.Request
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, ProjectModule, ContentTypeModule, AuthModule],
    }).compile()
    app = module.createNestApplication()
    configService = module.get<ConfigService>(ConfigService)
    const prismaServer = module.get<PrismaServer>(PrismaServer)
    addServiceFn = prismaServer.addService as jest.Mock<any>
    deployFn = prismaServer.deploy as jest.Mock<any>
    await app.init()
  })

  beforeEach(async () => {
    request = supertest(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${configService.testToken}`)
  })

  afterEach(() => {
    addServiceFn.mockClear()
    deployFn.mockClear()
  })

  it('should create a project', async () => {
    const projectName = 'testProject'
    const res = await request.send({
      query: `mutation {
              createProject(name: "${projectName}") {
                id
                providedName
                user {
                  username
                  id
                }
              }
            }
            `,
    })
    project = res.body.data.createProject as Project
    expect(project.providedName).toBe(projectName)
    expect(project.user.username).toBe(configService.testUser)
    expect(addServiceFn).toHaveBeenCalledTimes(1)
    expect(deployFn).toHaveBeenCalledTimes(1)
  })
  describe('getProject', () => {
    it('should retrieve a project from the db', async () => {
      const res = await request.send({
        query: `query {
              getProject(id: "${project.id}") {
                id
                providedName
              }
            }
            `,
      })
      expect(res.body.data.getProject.providedName).toBe(project.providedName)
      expect(res.body.data.getProject.id).toBe(project.id)
    })
    it('should return null if project doesnt exist', async () => {
      const res = await request.send({
        query: `query {
              getProject(id: "asdasd") {
                id
                providedName
              }
            }
            `,
      })
      expect(res.body.data.getProject).toBe(null)
    })
  })
  describe('getProjectWithToken', () => {
    it('should retrieve project with token for given project', async () => {
      const res = await request.send({
        query: `query {
              getProjectWithToken(id: "${project.id}") {
                project {
                  id
                  providedName
                }
                token
              }
            }`,
      })
      const projectWithToken = res.body.data.getProjectWithToken as ProjectWithToken
      expect(projectWithToken.project.id).toBe(project.id)
      expect(projectWithToken.project.providedName).toBe(project.providedName)
      expect(projectWithToken.token).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
    })
    it('should retrieve project with token for first user project', async () => {
      const res = await request.send({
        query: `query {
              getProjectWithToken {
                project {
                  id
                  providedName
                }
                token
              }
            }`,
      })
      const projectWithToken = res.body.data.getProjectWithToken as ProjectWithToken
      expect(projectWithToken.project.id).toBe(project.id)
      expect(projectWithToken.project.providedName).toBe(project.providedName)
      expect(projectWithToken.token).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
    })
    it('should return null for a not existent project', async () => {
      const res = await request.send({
        query: `query {
              getProjectWithToken(id: "notExistentId") {
                project {
                  id
                  providedName
                }
                token
              }
            }`,
      })
      expect(res.body.data.getProjectWithToken).toBe(null)
    })
  })
  describe('generatePermToken', () => {
    it('should generate a token for the given project', async () => {
      const res = await request.send({
        query: `query {
              generatePermToken(id: "${project.id}")
            }`,
      })
      const token = res.body.data.generatePermToken
      expect(token).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
    })
    it('should return null for a not existent project', async () => {
      const res = await request.send({
        query: `query {
              generatePermToken(id: "notExistent")
            }`,
      })
      const token = res.body.data.generatePermToken
      expect(token).toBe(null)
    })
  })
  describe('addContentType', () => {
    it('should add a content type to the given project', async () => {
      const res = await request.send({
        query: `mutation {
              addContentType(projectId: "${
                project.id
              }", contentTypeName: "article", description: "my-description") {
                name
                id
                description
                project {
                  id
                }
              }
            }`,
      })
      const contentType = res.body.data.addContentType as ContentType
      contentTypes.push(contentType)
      expect(contentType.name).toBe('article')
      expect(contentType.description).toBe('my-description')
      expect(contentType.project.id).toBe(project.id)
      expect(deployFn).toHaveBeenCalledTimes(1)
      expect(deployFn.mock.calls[0][2]).toMatch(/type article/)
    })
    it('should add another content type to the given project and append it to the datamodel', async () => {
      const res = await request.send({
        query: `mutation {
              addContentType(projectId: "${
                project.id
              }", contentTypeName: "book", description: "i love books") {
                name
                id
                description
                project {
                  id
                }
              }
            }`,
      })
      const contentType = res.body.data.addContentType as ContentType
      contentTypes.push(contentType)
      expect(contentType.name).toBe('book')
      expect(contentType.description).toBe('i love books')
      expect(contentType.project.id).toBe(project.id)
      expect(deployFn).toHaveBeenCalledTimes(1)
      expect(deployFn.mock.calls[0][2]).toMatch(/type article/)
      expect(deployFn.mock.calls[0][2]).toMatch(/type book/)
    })
    it('should throw an error if content type already exist', async () => {
      const res = await request.send({
        query: `mutation {
              addContentType(projectId: "${
                project.id
              }", contentTypeName: "article", description: "my-description") {
                name
                description
                project {
                  id
                }
              }
            }`,
      })
      expect(res.body.errors).not.toBe(undefined)
      expect(deployFn).toHaveBeenCalledTimes(0)
    })
    it('should throw an error if content type name is invalid', async () => {
      const res = await request.send({
        query: `mutation {
              addContentType(projectId: "${
                project.id
              }", contentTypeName: "book let", description: "my-description") {
                name
                description
                project {
                  id
                }
              }
            }`,
      })
      expect(res.body.errors).not.toBe(undefined)
      expect(deployFn).toHaveBeenCalledTimes(0)
    })
  })
  describe('addContentTypeField', () => {
    it('should add a field to type article', async () => {
      const res = await request.send({
        query: `mutation {
            addContentTypeField(contentTypeField: {contentTypeId: "${
              contentTypes[0].id
            }", name: "author", type: String, isRequired: false}) {
              id
              name
              contentType {
                id
              }
            }
          }`,
      })
      const field = res.body.data.addContentTypeField as ContentTypeField
      contentTypeFields.push(field)
      expect(field.contentType.id).toBe(contentTypes[0].id)
      expect(deployFn).toHaveBeenCalledTimes(1)
      expect(deployFn.mock.calls[0][2]).toMatch(/author:String/)
    })
    it('should add a another field and append it to the datamodel', async () => {
      const res = await request.send({
        query: `mutation {
            addContentTypeField(contentTypeField: {contentTypeId: "${
              contentTypes[0].id
            }", name: "available", type: Checkbox, isRequired: true}) {
              id
              name
              contentType {
                id
              }
            }
          }`,
      })
      const field = res.body.data.addContentTypeField as ContentTypeField
      contentTypeFields.push(field)
      expect(field.contentType.id).toBe(contentTypes[0].id)
      expect(deployFn).toHaveBeenCalledTimes(1)
      expect(deployFn.mock.calls[0][2]).toMatch(/author:String/)
      expect(deployFn.mock.calls[0][2]).toMatch(/available:Boolean!/)
    })
  })
  describe('deleteContentTypeField', () => {
    it('should delete content type field', async () => {
      const res = await request.send({
        query: `mutation {
            deleteContentTypeField(id: "${contentTypeFields[0].id}") {
              id
            }
          }`,
      })
      const field = res.body.data.deleteContentTypeField as ContentTypeField
      expect(field.id).toBe(contentTypeFields[0].id)
      expect(deployFn).toHaveBeenCalledTimes(1)
      expect(deployFn.mock.calls[0][2]).not.toMatch(/author:String/)
      expect(deployFn.mock.calls[0][2]).toMatch(/available:Boolean!/)
    })
    it('should throw an error if content type field doesnt exist', async () => {
      const res = await request.send({
        query: `mutation {
            deleteContentTypeField(id: "123") {
              id
            }
          }`,
      })
      expect(res.body.errors).not.toBe(undefined)
      expect(deployFn).toHaveBeenCalledTimes(0)
    })
    it('should delete last content type field', async () => {
      const res = await request.send({
        query: `mutation {
            deleteContentTypeField(id: "${contentTypeFields[1].id}") {
              id
            }
          }`,
      })
      const field = res.body.data.deleteContentTypeField as ContentTypeField
      expect(field.id).toBe(contentTypeFields[1].id)
      expect(deployFn).toHaveBeenCalledTimes(1)
      expect(deployFn.mock.calls[0][2]).not.toMatch(/author:String/)
      expect(deployFn.mock.calls[0][2]).not.toMatch(/available:Boolean!/)
    })
  })
  describe('deleteContentType', () => {
    it('should delete content type', async () => {
      const res = await request.send({
        query: `mutation {
            deleteContentType(id: "${contentTypes[0].id}") {
              id
            }
          }`,
      })
      const contentType = res.body.data.deleteContentType as ContentType
      expect(contentType.id).toBe(contentTypes[0].id)
      expect(deployFn).toHaveBeenCalledTimes(1)
      expect(deployFn.mock.calls[0][2]).not.toMatch(/type article/)
      expect(deployFn.mock.calls[0][2]).toMatch(/type book/)
    })
    it('should throw an error if content type doesnt exist', async () => {
      const res = await request.send({
        query: `mutation {
            deleteContentType(id: "123") {
              id
            }
          }`,
      })
      expect(res.body.errors).not.toBe(undefined)
      expect(deployFn).toHaveBeenCalledTimes(0)
    })
    it('should delete last content type', async () => {
      const res = await request.send({
        query: `mutation {
            deleteContentType(id: "${contentTypes[1].id}") {
              id
            }
          }`,
      })
      const contentType = res.body.data.deleteContentType as ContentType
      expect(contentType.id).toBe(contentTypes[1].id)
      expect(deployFn).toHaveBeenCalledTimes(1)
      expect(deployFn.mock.calls[0][2]).toMatch(Datamodel.DEFAULT)
    })
  })
})
