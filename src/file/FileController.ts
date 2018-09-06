import { Get, Controller } from '@nestjs/common'

@Controller('file')
export class FileController {
  @Get()
  root(): string {
    return 'Hello'
  }
}
