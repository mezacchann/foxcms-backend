import { Module, forwardRef } from '@nestjs/common'
import { AuthService } from './AuthService'
import { JwtStrategy } from './JwtStrategy'
import { PrismaModule } from '../prisma/PrismaModule'

@Module({
  imports: [PrismaModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
