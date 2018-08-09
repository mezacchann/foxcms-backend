import { Module } from '@nestjs/common'
import { ContentTypeService } from './ContentTypeService'
import { PrismaModule } from './../prisma/PrismaModule'

@Module({
  imports: [PrismaModule],
  providers: [ContentTypeService],
  exports: [ContentTypeService],
})
export class ContentTypeModule {}
