import { Module } from '@nestjs/common'
import { UserService } from './UserService'
import { UserResolver } from './UserResolver'
import { ProjectModule } from '../project/ProjectModule'

@Module({
  imports: [ProjectModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
