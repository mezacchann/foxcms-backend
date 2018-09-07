import * as request from 'supertest'
import * as jsonwebtoken from 'jsonwebtoken'
import { Test } from '@nestjs/testing'
import { UserModule } from '../UserModule'
import { INestApplication } from '@nestjs/common'
import { AuthModule } from '../../auth/AuthModule'
import { AppModule } from '../../app.module'
import { ProjectModule } from '../../project/ProjectModule'
import { ProjectService } from '../../project/ProjectService'
import { UserService } from '../UserService'
import { ConfigService } from '../../config/ConfigService'

describe('User', () => {
  let app: INestApplication
  const projectService = { buildProject: jest.fn() }
  let userService: UserService
  let configService: ConfigService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, UserModule, ProjectModule, AuthModule],
    })
      .overrideProvider(ProjectService)
      .useValue(projectService)
      .compile()
    app = module.createNestApplication()
    userService = module.get<UserService>(UserService)
    configService = module.get<ConfigService>(ConfigService)
    await app.init()
  })
  beforeEach(() => projectService.buildProject.mockReset())
  describe('login', () => {
    it('should login successful and create a token', async () => {
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `query{login(username: "${configService.testUser}", password: "${
            configService.testPassword
          }")}`,
        })
        .expect(200)
      expect(res.body.data.login).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
    })

    it('should throw an error', async () => {
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `query{login(username: "${
            configService.testUser
          }", password: "wrongPassword")}`,
        })
      expect(res.body.errors).not.toBe(undefined)
    })
  })

  describe('signup', () => {
    it('should create a new user,project and return a valid token', async () => {
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `query{signup(username: "wowa", password: "secret")}`,
        })
        .expect(200)
      expect(res.body.data.signup).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
      const tokenPayload = jsonwebtoken.decode(res.body.data.signup)
      const user = await userService.getUserById(tokenPayload.sub, '{username}')
      expect(user.username).toBe('wowa')
      expect(projectService.buildProject).toHaveBeenCalledTimes(1)
    })

    it('should throw an error if user already exists', async () => {
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `query{signup(username: "peter", password: "secret")}`,
        })
        .expect(200)
      expect(res.body.errors).not.toBe(undefined)
      expect(projectService.buildProject).toHaveBeenCalledTimes(0)
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
