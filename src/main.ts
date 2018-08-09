import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as jwt from 'express-jwt'
import { expressJwtSecret } from 'jwks-rsa'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const auth = jwt({
    secret: expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://foxcms.auth0.com/.well-known/jwks.json',
    }),
    audience: 'https://foxcms/api',
    issuer: 'https://foxcms.auth0.com/',
    algorithm: 'RS256',
  })
  app.use(auth)
  const appModule = app.get(AppModule)
  appModule.configureGraphQL(app)
  app.enableCors()
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
