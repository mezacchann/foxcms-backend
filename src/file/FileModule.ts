import { Module } from '@nestjs/common'
import { FileController } from './FileController'

@Module({
  imports: [],
  controllers: [FileController],
})
export class FileModule {}
