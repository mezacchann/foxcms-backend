import {
  Controller,
  Post,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
} from '@nestjs/common'

@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    console.log(file)
    console.log('woow')
  }
}
