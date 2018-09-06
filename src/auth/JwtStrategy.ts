import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common'
import { JwtPayload } from './JwtPayload'
import { Prisma } from '../typings/prisma'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('PrismaBinding') private readonly prismaBinding: Prisma) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.FOXCMS_SECRET,
    })
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    let user = await this.prismaBinding.query.user({ where: { id: payload.sub } })
    if (process.env.NODE_ENV === 'test') {
      user = await this.prismaBinding.query.user({
        where: { username: process.env.TEST_USER },
      })
    }
    if (!user) {
      done(new UnauthorizedException(), false)
    }
    done(null, user)
  }
}
