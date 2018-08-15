import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common'
import * as proxy from 'express-http-proxy'

@Injectable()
export class ProjectProxyMiddleware implements NestMiddleware {
  resolveHost(req) {
    const prismaServerEndpoint = new URL(process.env.PRISMA_SERVER_ENDPOINT)
    return `${prismaServerEndpoint.origin}${req.url}`
  }

  resolve(...args: any[]): MiddlewareFunction {
    return proxy(this.resolveHost)
  }
}
