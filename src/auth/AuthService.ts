import * as jwt from 'jsonwebtoken'
import { Injectable } from '@nestjs/common'
import { JwtPayload } from './JwtPayload'
import { ConfigService } from '../config/ConfigService'

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}
  createToken(jwtPayload: JwtPayload): string {
    return jwt.sign(jwtPayload, this.configService.foxCmsSecret, { expiresIn: '1h' })
  }
}
