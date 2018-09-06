import {
  Controller,
  Post,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ProjectGuard } from '../project/ProjectGuard'

@Controller('file')
@UseGuards(AuthGuard('jwt'), ProjectGuard)
export class FileController {
  @Post(':projectId')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    console.log(file)
    console.log('woow')
  }
}
