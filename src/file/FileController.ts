import {
  Controller,
  Post,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  UseGuards,
  Inject,
  Param,
  Delete,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ProjectGuard } from '../project/ProjectGuard'
import { Prisma } from '../typings/prisma'
import * as fs from 'fs'
import * as path from 'path'

@Controller('file')
@UseGuards(AuthGuard('jwt'))
export class FileController {
  constructor(@Inject('PrismaBinding') private readonly prismaBinding: Prisma) {}

  @UseGuards(ProjectGuard)
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

  @Delete(':fileId')
  async deleteFile(@Param('fileId') fileId) {
    const file = await this.prismaBinding.mutation.deleteFile({
      where: { id: fileId },
    })
    if (!file) {
      throw new Error('File does not exist')
    } else if (!process.env.UPLOAD_DIR) {
      throw new Error('Fix later.')
    }
    fs.unlink(path.join(process.env.UPLOAD_DIR, file.fileName), err => console.log(err))
    return file
  }
}
