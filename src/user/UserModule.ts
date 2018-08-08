import { Module } from '@nestjs/common'
import { UserService } from './UserService'
import { UserResolver } from './UserResolver'
import { ProjectModule } from '../project/ProjectModule'
import { PrismaModule } from '../prisma/PrismaModule'

@Module({
  imports: [ProjectModule, PrismaModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
