import {
  Injectable,
  NestMiddleware,
  MiddlewareFunction,
  UnauthorizedException,
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { ProjectService } from './ProjectService'
import { AuthService } from '../auth/AuthService'
import { JwtPayload } from '../auth/JwtPayload'

@Injectable()
export class ProjectProxyAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly projectService: ProjectService,
  ) {}
  resolve(name: string): MiddlewareFunction {
    return async (req, res, next) => {
      if (!req.headers.authorization) {
        next(new UnauthorizedException())
      }
      const authHeader = req.headers.authorization
      if (authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7, authHeader.length)
        try {
          const jwtPayload = jwt.verify(token, process.env.FOXCMS_SECRET)
          const user = await this.authService.validateUser(
            jwtPayload as JwtPayload,
          )
          const paths = req.url.split('/')
          if (!paths || paths.length < 2) {
            return new Error('Invalid path')
          }
          const projectToken = await this.projectService.generateTempProjectToken(
            paths[1],
          )
          req.headers.authorization = projectToken
          next()
        } catch (err) {
          // Request is not coming from foxcms-client
          // Request will be processes to project api
          next()
        }
      } else {
        next(new UnauthorizedException())
      }
    }
  }
}
