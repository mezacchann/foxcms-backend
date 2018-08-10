import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './AuthService'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
    })
  }

  async validate(payload: any, done: Function) {
    const user = await this.authService.validateUser(payload)
    if (!user) {
      return done(new UnauthorizedException(), false)
    }
    done(null, user)
  }
}
