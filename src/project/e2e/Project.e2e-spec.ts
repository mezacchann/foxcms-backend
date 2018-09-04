import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../app.module'
import { ProjectModule } from '../ProjectModule'
import { AuthModule } from '../../auth/AuthModule'
import { ContentTypeModule } from '../../content-type/ContentTypeModule'
import { Project, ContentType } from '../../typings/prisma'
import { ProjectWithToken } from '../ProjectWithToken'
import Datamodel from '../../prisma/Datamodel'
import { ProjectService } from '../ProjectService'

describe('Project', () => {
  let app: INestApplication
  let projectService: ProjectService
  let project: Project
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, ProjectModule, ContentTypeModule, AuthModule],
    }).compile()
    app = module.createNestApplication()
    projectService = app.get<ProjectService>(ProjectService)
    await app.init()
  })

  it('should create a project', async () => {
    const projectName = 'testProject'
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
      .send({
        query: `mutation {
              createProject(name: "${projectName}") {
                id
                providedName
                datamodel
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
    expect(project.user.username).toBe(process.env.TEST_USER)
    expect(project.datamodel).toBe(Datamodel.DEFAULT)
  })
  describe('getProject', () => {
    it('should retrieve a project from the db', async () => {
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
        .send({
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
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
        .send({
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
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
        .send({
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
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
        .send({
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
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
        .send({
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
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
        .send({
          query: `query {
              generatePermToken(id: "${project.id}")
            }`,
        })
      const token = res.body.data.generatePermToken
      expect(token).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
    })
    it('should return null for a not existent project', async () => {
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
        .send({
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
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
        .send({
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
      const contentType = res.body.data.addContentType as ContentType
      expect(contentType.name).toBe('article')
      expect(contentType.description).toBe('my-description')
      expect(contentType.project.id).toBe(project.id)
    })
    it('should throw an error if content type already exist', async () => {
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
        .send({
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
    })
  })
})
