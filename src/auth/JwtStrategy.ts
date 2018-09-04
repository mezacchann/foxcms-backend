import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload } from './JwtPayload'
import { UserService } from '../user/UserService'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.FOXCMS_SECRET,
    })
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    let user = await this.userService.getUserById(payload.sub)
    if (process.env.NODE_ENV === 'test') {
      user = await this.userService.getUser(process.env.TEST_USER ? process.env.TEST_USER : '')
    }
    if (!user) {
      done(new UnauthorizedException(), false)
    }
    done(null, user)
  }
}
