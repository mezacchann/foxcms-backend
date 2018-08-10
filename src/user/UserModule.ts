import { Module, forwardRef } from '@nestjs/common'
import { UserService } from './UserService'
import { UserResolver } from './UserResolver'
import { ProjectModule } from '../project/ProjectModule'
import { PrismaModule } from '../prisma/PrismaModule'
import { AuthModule } from '../auth/auth.module'
@Module({
  imports: [
    forwardRef(() => ProjectModule),
    forwardRef(() => AuthModule),
    PrismaModule,
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
