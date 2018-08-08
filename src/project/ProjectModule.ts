import { Module, forwardRef } from '@nestjs/common'
import { ProjectService } from './ProjectService'
import { PrismaModule } from './../prisma/PrismaModule'
import { ProjectResolver } from './ProjectResolver'
import { UserModule } from '../user/UserModule'

@Module({
  imports: [PrismaModule, forwardRef(() => UserModule)],
  providers: [ProjectService, ProjectResolver],
  exports: [ProjectService],
})
export class ProjectModule {}
