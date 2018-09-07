import { Test } from '@nestjs/testing'
import * as bcrypt from 'bcrypt'
import { UserService } from '../user/UserService'
import { AuthService } from '../auth/AuthService'
import { ProjectService } from '../project/ProjectService'
import { ContentTypeService } from '../content-type/ContentTypeService'
import { Prisma } from '../typings/prisma'
import { ConfigService } from '../config/ConfigService'

const PrismaBinding = jest.fn<Prisma>(() => ({
  mutation: {
    createUser: jest.fn(),
    createProject: jest.fn(),
  },
}))
const binding = new PrismaBinding()

describe('UserService', () => {
  let userService: UserService
  let authService: AuthService
  let projectService: ProjectService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
        ProjectService,
        ContentTypeService,
        { provide: ConfigService, useValue: new ConfigService(`test.env`) },
        { provide: 'PrismaBinding', useValue: binding },
        { provide: 'PrismaServer', useValue: {} },
        { provide: 'PrismaManagementToken', useValue: '' },
        { provide: 'ManagementApiClient', useValue: {} },
      ],
    }).compile()

    userService = module.get<UserService>(UserService)
    authService = module.get<AuthService>(AuthService)
    projectService = module.get<ProjectService>(ProjectService)
  })

  describe('login', () => {
    it('should create token a valid token', async () => {
      const userPassword = bcrypt.hashSync('secret', bcrypt.genSaltSync())
      const user = { id: 123, password: userPassword }
      jest.spyOn(userService, 'getUser').mockResolvedValue(user)
      const token = await userService.login('peter', 'secret')
      expect(token).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
    })

    it('should throw an error', () => {
      const userPassword = bcrypt.hashSync('secret', bcrypt.genSaltSync())
      const user = { id: 123, password: userPassword }
      jest.spyOn(userService, 'getUser').mockResolvedValue(user)
      expect(userService.login('peter', 'wrongPassword')).rejects.toThrowError()
    })
  })

  describe('signup', () => {
    it('should create a new user,project and return a valid token', async () => {
      const jestFunction = binding.mutation.createUser as jest.Mock
      jestFunction.mockImplementationOnce(() => ({ id: 123 }))
      jest.spyOn(userService, 'getUser').mockResolvedValue(null)
      const buildProjectFn = jest.fn()
      jest.spyOn(projectService, 'buildProject').mockImplementation(buildProjectFn)
      const token = await userService.signup('peter', 'secret')
      expect(token).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
      expect(buildProjectFn).toHaveBeenCalledTimes(1)
    })
    it('should throw an error if user already exists', () => {
      jest.spyOn(userService, 'getUser').mockResolvedValue({ id: 123 })
      expect(userService.signup('peter', 'secret')).rejects.toThrowError()
    })
  })
})
