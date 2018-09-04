import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../app.module'
import { ProjectModule } from '../ProjectModule'
import { UserModule } from '../../user/UserModule'
import { AuthModule } from '../../auth/AuthModule'
import { ContentTypeModule } from '../../content-type/ContentTypeModule'
import { Project } from '../../typings/prisma'
import { ProjectWithToken } from '../ProjectWithToken'
describe('Project', () => {
  let app: INestApplication
  let project: Project
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, ProjectModule, ContentTypeModule, UserModule, AuthModule],
    }).compile()
    app = module.createNestApplication()
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
})
