import { Module, forwardRef } from '@nestjs/common'
import { AuthService } from './AuthService'
import { JwtStrategy } from './JwtStrategy'
import { UserModule } from './../user/UserModule'

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
