import { Module, MulterModule } from '@nestjs/common'
import { FileController } from './FileController'
import * as multer from 'multer'
import * as fs from 'fs'
import { ProjectModule } from '../project/ProjectModule'

@Module({
  imports: [
    MulterModule.register({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          if (!process.env.CONTENT_DIR) {
            throw new Error('Fix later')
          }
          if (!fs.existsSync(process.env.CONTENT_DIR)) {
            fs.mkdirSync(process.env.CONTENT_DIR)
          }
          cb(null, process.env.CONTENT_DIR)
        },
      }),
    }),
    ProjectModule,
  ],
  controllers: [FileController],
})
export class FileModule {}
