import { Module, forwardRef } from '@nestjs/common'
import { UserService } from './UserService'
import { UserResolver } from './UserResolver'
import { ProjectModule } from '../project/ProjectModule'
import { PrismaModule } from '../prisma/PrismaModule'
import { AuthModule } from '../auth/AuthModule'
@Module({
  imports: [ProjectModule, forwardRef(() => AuthModule), PrismaModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
