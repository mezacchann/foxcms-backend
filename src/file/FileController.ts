import {
  Controller,
  Post,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  UseGuards,
  Inject,
  Param,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ProjectGuard } from '../project/ProjectGuard'
import { Prisma } from '../typings/prisma'
import * as multer from 'multer'

@Controller('file')
@UseGuards(AuthGuard('jwt'), ProjectGuard)
export class FileController {
  constructor(@Inject('PrismaBinding') private readonly prismaBinding: Prisma) {}

  @Post(':projectId')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file, @Param('projectId') projectId) {
    return this.prismaBinding.mutation.createFile({
      data: {
        originalName: file.originalname,
        fileName: file.filename,
        mimeType: file.mimetype,
        url: file.filename,
        size: file.size,
        project: { connect: { id: projectId } },
      },
    })
  }
}
