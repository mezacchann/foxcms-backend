import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'
import { JwtPayload } from './JwtPayload'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  createToken(jwtPayload: JwtPayload): string {
    return this.jwtService.sign(jwtPayload)
  }
}
