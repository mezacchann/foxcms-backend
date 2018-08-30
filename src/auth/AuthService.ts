import * as jwt from 'jsonwebtoken'
import { Injectable } from '@nestjs/common'
import { JwtPayload } from './JwtPayload'

@Injectable()
export class AuthService {
  createToken(jwtPayload: JwtPayload): string {
    return jwt.sign(jwtPayload, process.env.FOXCMS_SECRET, { expiresIn: '1h' })
  }
}
