import { Module } from '@nestjs/common'
import { ContentTypeResolver } from './ContentTypeResolver'
import { ContentTypeService } from './ContentTypeService'
import { PrismaModule } from './../prisma/PrismaModule'

@Module({
  imports: [PrismaModule],
  providers: [ContentTypeResolver, ContentTypeService],
})
export class ContentTypeModule {}
