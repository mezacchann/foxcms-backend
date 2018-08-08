import { Module, forwardRef } from '@nestjs/common'
import { UserService } from './UserService'
import { UserResolver } from './UserResolver'
import { ProjectModule } from '../project/ProjectModule'
import { PrismaModule } from '../prisma/PrismaModule'

@Module({
  imports: [forwardRef(() => ProjectModule), PrismaModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
