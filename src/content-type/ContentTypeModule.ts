import { Module } from '@nestjs/common'
import { ContentTypeService } from './ContentTypeService'
import { PrismaModule } from './../prisma/PrismaModule'
import { ContentTypeResolver } from './ContentTypeResolver'

@Module({
  imports: [PrismaModule],
  providers: [ContentTypeService, ContentTypeResolver],
  exports: [ContentTypeService],
})
export class ContentTypeModule {}
