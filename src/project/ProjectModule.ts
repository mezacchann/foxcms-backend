import { Module } from '@nestjs/common'
import { ProjectService } from './ProjectService'
import { PrismaModule } from './../prisma/PrismaModule'
import { ProjectResolver } from './ProjectResolver'
import { ContentTypeModule } from './../content-type/ContentTypeModule'
import { AuthModule } from '../auth/AuthModule'
import { ProjectGuard } from './ProjectGuard'

@Module({
  imports: [PrismaModule, ContentTypeModule, AuthModule],
  providers: [ProjectService, ProjectResolver, ProjectGuard],
  exports: [ProjectService, ProjectGuard],
})
export class ProjectModule {}
