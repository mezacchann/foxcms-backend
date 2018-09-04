import { Module } from '@nestjs/common'
import { ProjectService } from './ProjectService'
import { PrismaModule } from './../prisma/PrismaModule'
import { ProjectResolver } from './ProjectResolver'
import { ContentTypeModule } from './../content-type/ContentTypeModule'
import { AuthModule } from '../auth/AuthModule'

@Module({
  imports: [PrismaModule, ContentTypeModule, AuthModule],
  providers: [ProjectService, ProjectResolver],
  exports: [ProjectService],
})
export class ProjectModule {}
