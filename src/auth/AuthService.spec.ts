import { Test } from '@nestjs/testing'
import * as jwt from 'jsonwebtoken'
import { AuthService } from './AuthService'
import { JwtPayload } from './JwtPayload'
import { ConfigService } from '../config/ConfigService'

describe('AuthService', () => {
  let authService: AuthService
  let configService: ConfigService
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService, ConfigService],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    configService = module.get<ConfigService>(ConfigService)
  })

  it('should create a valid token', () => {
    const payload: JwtPayload = { sub: '123' }
    const token = authService.createToken(payload)
    expect(token).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
    const decodedToken = jwt.verify(token, configService.foxCmsSecret)
    expect(decodedToken).toHaveProperty('iat')
    expect(decodedToken).toHaveProperty('exp')
    expect(decodedToken).toHaveProperty('sub', '123')
  })
})
