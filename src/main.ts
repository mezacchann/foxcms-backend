import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const appModule = app.get(AppModule)
  appModule.configureGraphQL(app)
  app.enableCors()
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
