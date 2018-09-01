import { Test } from '@nestjs/testing'
import * as jsonwebtoken from 'jsonwebtoken'
import { UserService } from '../user/UserService'
import { AuthService } from '../auth/AuthService'
import { ProjectService } from '../project/ProjectService'
import { ContentTypeService } from '../content-type/ContentTypeService'
import prismaBinding from '../../testSetup'

describe('UserService', () => {
  let userService: UserService
  let projectService: ProjectService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
        ProjectService,
        ContentTypeService,
        { provide: 'PrismaBinding', useValue: prismaBinding },
        { provide: 'PrismaManagementToken', useValue: '' },
      ],
    }).compile()

    userService = module.get<UserService>(UserService)
    projectService = module.get<ProjectService>(ProjectService)
  })

  describe('login', () => {
    it('should create token a valid token', async () => {
      const token = await userService.login(process.env.TEST_USER, process.env.TEST_PASSWORD)
      expect(token).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
    })

    it('should throw an error', () => {
      expect(userService.login(process.env.TEST_USER, 'wrongPassword')).rejects.toThrowError()
    })
  })

  describe('signup', () => {
    it('should create a new user,project and return a valid token', async () => {
      const buildProjectFn = jest.fn()
      jest.spyOn(projectService, 'buildProject').mockImplementation(buildProjectFn)
      const token = await userService.signup('wowa', 'secret')
      expect(token).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
      const tokenPayload = jsonwebtoken.decode(token)
      const user = await userService.getUserById(tokenPayload.sub, '{username}')
      expect(user.username).toBe('wowa')
      expect(buildProjectFn).toHaveBeenCalledTimes(1)
    })

    it('should throw an error if user already exists', () => {
      const buildProjectFn = jest.fn()
      jest.spyOn(projectService, 'buildProject').mockImplementation(buildProjectFn)
      expect(userService.signup('peter', 'secret')).rejects.toThrowError()
      expect(buildProjectFn).toHaveBeenCalledTimes(0)
    })
  })
})
