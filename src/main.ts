import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config } from 'dotenv'

async function bootstrap() {
  const result = config()
  if (result.error) {
    throw new Error('Cannot configure environment variables: ' + result.error)
  }
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  await app.listen(process.env.PORT || 3090)
}
bootstrap()
