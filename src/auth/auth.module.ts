import { Module, forwardRef } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { UserModule } from './../user/UserModule'

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
