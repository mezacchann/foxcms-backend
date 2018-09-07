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
  Req,
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
import { ConfigService } from '../config/ConfigService'

const prefix = 'file'
@Controller(prefix)
@UseGuards(AuthGuard('jwt'))
export class FileController {
  constructor(
    @Inject('PrismaBinding') private readonly prismaBinding: Prisma,
    private readonly fileService: FileService,
    private configService: ConfigService,
  ) {}

  @UseGuards(ProjectGuard)
  @Post(':projectId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Req() req, @UploadedFile() file, @Param('projectId') projectId) {
    const createdFile = await this.prismaBinding.mutation.createFile({
      data: {
        originalName: file.originalname,
        fileName: file.filename,
        mimeType: file.mimetype,
        url: file.filename,
        size: file.size,
        project: { connect: { id: projectId } },
      },
    })
    return this.prismaBinding.mutation.updateFile(
      {
        data: { url: path.join(req.get('host'), prefix, createdFile.id) },
        where: { id: createdFile.id },
      },
      '{originalName, url}',
    )
  }

  @UseGuards(FileGuard)
  @Delete(':fileId')
  async deleteFile(@Param('fileId') fileId) {
    const file = await this.prismaBinding.mutation.deleteFile({
      where: { id: fileId },
    })
    if (!file) {
      throw new NotFoundException()
    }
    fs.unlink(path.join(this.configService.uploadDir, file.fileName), err => console.log(err))
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
    if (!file) {
      throw new NotFoundException()
    }
    let fileBuffer = fs.readFileSync(path.join(this.configService.uploadDir, file.fileName))
    if (file.mimeType.match(/image/) && (height || width)) {
      fileBuffer = await sharp(fileBuffer)
        .resize(width, height)
        .toBuffer()
    }
    res.set('Content-Type', file.mimeType)
    res.end(fileBuffer)
  }
}
