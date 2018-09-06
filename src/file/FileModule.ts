import { Module, MulterModule } from '@nestjs/common'
import { FileController } from './FileController'
import * as multer from 'multer'
import * as fs from 'fs'
import { ProjectModule } from '../project/ProjectModule'
import { PrismaModule } from '../prisma/PrismaModule'

@Module({
  imports: [
    MulterModule.register({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          if (!process.env.UPLOAD_DIR) {
            throw new Error('Fix later')
          }
          if (!fs.existsSync(process.env.UPLOAD_DIR)) {
            fs.mkdirSync(process.env.UPLOAD_DIR)
          }
          cb(null, process.env.UPLOAD_DIR)
        },
      }),
    }),
    ProjectModule,
    PrismaModule,
  ],
  controllers: [FileController],
})
export class FileModule {}
