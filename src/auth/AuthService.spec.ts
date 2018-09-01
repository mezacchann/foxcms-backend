import { Test } from '@nestjs/testing'
import * as jwt from 'jsonwebtoken'
import { AuthService } from './AuthService'
import { JwtPayload } from './JwtPayload'

describe('AuthService', () => {
  let authService: AuthService
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService],
    }).compile()

    authService = module.get<AuthService>(AuthService)
  })

  it('should create a valid token', () => {
    const payload: JwtPayload = { sub: 123 }
    const token = authService.createToken(payload)
    expect(token).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
    const decodedToken = jwt.verify(token, process.env.FOXCMS_SECRET)
    expect(decodedToken).toHaveProperty('iat')
    expect(decodedToken).toHaveProperty('exp')
    expect(decodedToken).toHaveProperty('sub', 123)
  })
})
