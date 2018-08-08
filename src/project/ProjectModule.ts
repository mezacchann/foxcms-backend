import { Module } from '@nestjs/common'
import { ProjectService } from './ProjectService'
import { PrismaModule } from './../prisma/PrismaModule'

@Module({
  imports: [PrismaModule],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
