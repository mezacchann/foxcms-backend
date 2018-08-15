import { Module, forwardRef } from '@nestjs/common'
import { ProjectService } from './ProjectService'
import { PrismaModule } from './../prisma/PrismaModule'
import { ProjectResolver } from './ProjectResolver'
import { UserModule } from '../user/UserModule'
import { ContentTypeModule } from './../content-type/ContentTypeModule'
import { ProjectProxyMiddleware } from './ProjectProxyMiddleware'
import { ProjectProxyAuthMiddleware } from './ProjectProxyAuthMiddleware'
import { AuthModule } from '../auth/AuthModule'

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => UserModule),
    ContentTypeModule,
    AuthModule,
  ],
  providers: [
    ProjectService,
    ProjectResolver,
    ProjectProxyMiddleware,
    ProjectProxyAuthMiddleware,
  ],
  exports: [ProjectService],
})
export class ProjectModule {}
