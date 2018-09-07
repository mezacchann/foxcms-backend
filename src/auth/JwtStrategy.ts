import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common'
import { JwtPayload } from './JwtPayload'
import { Prisma } from '../typings/prisma'
import { ConfigService } from '../config/ConfigService'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('PrismaBinding') private readonly prismaBinding: Prisma,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.foxCmsSecret,
    })
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    let user = await this.prismaBinding.query.user({ where: { id: payload.sub } })
    if (this.configService.nodeEnv === 'test') {
      user = await this.prismaBinding.query.user({
        where: { username: this.configService.testUser },
      })
    }
    if (!user) {
      done(new UnauthorizedException(), false)
    }
    done(null, user)
  }
}
