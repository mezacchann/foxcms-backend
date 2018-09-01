import { Test } from '@nestjs/testing'
import { JwtStrategy } from './JwtStrategy'
import { UserService } from '../user/UserService'
import { UnauthorizedException } from '@nestjs/common'
import { AuthService } from './AuthService'
import { ProjectService } from '../project/ProjectService'
import { ContentTypeService } from '../content-type/ContentTypeService'

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy
  let userService: UserService
  const verifiedCallback = jest.fn()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        UserService,
        UserService,
        AuthService,
        ProjectService,
        ContentTypeService,
        { provide: 'PrismaManagementToken', useValue: '' },
        { provide: 'PrismaBinding', useValue: {} },
      ],
    }).compile()

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy)
    userService = module.get<UserService>(UserService)
  })

  afterEach(() => verifiedCallback.mockClear())

  it('should execute the verified function with the resolved user', async () => {
    const user = { id: 1, username: 'peter' }
    jest.spyOn(userService, 'getUserById').mockImplementation(() => user)
    await jwtStrategy.validate({ sub: '1' }, verifiedCallback)
    expect(verifiedCallback).toBeCalledWith(null, user)
  })

  it('should execute the verified function with the Unauthorized Exception', async () => {
    jest.spyOn(userService, 'getUserById').mockImplementation(() => null)
    await jwtStrategy.validate({ sub: '1' }, verifiedCallback)
    const exception = new UnauthorizedException()
    expect(verifiedCallback.mock.calls[0][0].status).toEqual(exception.getStatus())
  })
})
