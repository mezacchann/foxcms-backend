import * as jwt from 'jsonwebtoken'
import { Injectable } from '@nestjs/common'
import { UserService } from './../user/UserService'
import { JwtPayload } from './JwtPayload'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  createToken(jwtPayload: JwtPayload): string {
    return jwt.sign(jwtPayload, process.env.FOXCMS_SECRET, { expiresIn: '1h' })
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.getUser(payload.username)
  }
}
