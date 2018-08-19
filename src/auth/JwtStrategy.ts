import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'
import { AuthService } from './AuthService'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload } from './JwtPayload'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.FOXCMS_SECRET,
    })
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload)
    if (!user) {
      done(new UnauthorizedException(), false)
    }
    done(null, user)
  }
}
