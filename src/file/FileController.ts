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
  Get,
  Res,
  Query,
  NotFoundException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ProjectGuard } from '../project/ProjectGuard'
import { Prisma } from '../typings/prisma'
import * as fs from 'fs'
import * as path from 'path'
import { FileGuard } from './FileGuard'
import { FileService } from './FileService'
import * as sharp from 'sharp'
import { OptionalInt } from '../pipes/OptionalInt'

@Controller('file')
@UseGuards(AuthGuard('jwt'))
export class FileController {
  constructor(
    @Inject('PrismaBinding') private readonly prismaBinding: Prisma,
    private readonly fileService: FileService,
  ) {}

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

  @UseGuards(FileGuard)
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

  @UseGuards(FileGuard)
  @Get(':fileId')
  async getFile(
    @Param('fileId') fileId,
    @Query('width', OptionalInt) width,
    @Query('height', OptionalInt) height,
    @Res() res,
  ) {
    const file = await this.fileService.getFileById(fileId, '{fileName,mimeType}')
    if (!file || !process.env.UPLOAD_DIR) {
      throw new NotFoundException()
    }
    let fileBuffer = fs.readFileSync(path.join(process.env.UPLOAD_DIR, file.fileName))
    if (file.mimeType.match(/image/) && (height || width)) {
      fileBuffer = await sharp(fileBuffer)
        .resize(width, height)
        .toBuffer()
    }
    res.set('Content-Type', file.mimeType)
    res.end(fileBuffer)
  }
}
