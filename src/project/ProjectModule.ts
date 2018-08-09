import { Module, forwardRef } from '@nestjs/common'
import { ProjectService } from './ProjectService'
import { PrismaModule } from './../prisma/PrismaModule'
import { ProjectResolver } from './ProjectResolver'
import { UserModule } from '../user/UserModule'
import { ContentTypeModule } from './../content-type/ContentTypeModule'

@Module({
  imports: [PrismaModule, forwardRef(() => UserModule), ContentTypeModule],
  providers: [ProjectService, ProjectResolver],
  exports: [ProjectService],
})
export class ProjectModule {}
