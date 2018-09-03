import * as jwt from 'jsonwebtoken'
import { Injectable } from '@nestjs/common'
import { JwtPayload } from './JwtPayload'

@Injectable()
export class AuthService {
  createToken(jwtPayload: JwtPayload): string {
    if (!process.env.FOXCMS_SECRET) {
      throw new Error('Environment variable FOXCMS_SECRET is not set')
    }
    return jwt.sign(jwtPayload, process.env.FOXCMS_SECRET, { expiresIn: '1h' })
  }
}
