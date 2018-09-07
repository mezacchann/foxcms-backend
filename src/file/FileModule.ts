import { Module, MulterModule } from '@nestjs/common'
import { FileController } from './FileController'
import * as multer from 'multer'
import * as fs from 'fs'
import { ProjectModule } from '../project/ProjectModule'
import { PrismaModule } from '../prisma/PrismaModule'
import { FileService } from './FileService'
import { ConfigService } from '../config/ConfigService'

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        storage: multer.diskStorage({
          destination: (req, file, cb) => {
            if (!fs.existsSync(configService.uploadDir)) {
              fs.mkdirSync(configService.uploadDir)
            }
            cb(null, configService.uploadDir)
          },
        }),
      }),
    }),
    ProjectModule,
    PrismaModule,
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
