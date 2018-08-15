import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './AuthService'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.FOXCMS_SECRET,
    })
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload)
    if (!user) {
      return new UnauthorizedException()
    }
  }
}
