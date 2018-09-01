import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { UserModule } from '../UserModule'
import { INestApplication } from '@nestjs/common'
import { AuthModule } from '../../auth/AuthModule'
import { AppModule } from '../../app.module'
import { UserService } from '../UserService'

describe('Cats', () => {
  let app: INestApplication
  let userService: UserService
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, UserModule, AuthModule],
    }).compile()

    app = module.createNestApplication()
    userService = module.get<UserService>(UserService)
    await app.init()
  })

  it(`should create a user and return the token`, async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: 'query{signup(username: "peter2", password: "his-secret")}' })
  })

  afterAll(async () => {
    await app.close()
  })
})
