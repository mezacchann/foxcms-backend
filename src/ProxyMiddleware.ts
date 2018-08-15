import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common'
import * as proxy from 'express-http-proxy'

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  public resolveHost(req) {
    const projectHost = `https://prisma-server.dokku.wpr-dev.com${req.url}`
    console.log(projectHost)
    return projectHost
  }

  public resolveAccessToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0IjoiaW5pdGlhbC1wcm9qZWN0Iiwic3RhZ2UiOiJQcm9kdWN0aW9uIiwiaWF0IjoxNTM0Mjg5NTc1LCJleHAiOjE1NjU4NDcxNzV9.wnLaakHGI1sAWdQOmPSlbdwQpMWCVUURfX0oSbHjU40'
  }

  public resolve(...args: any[]): MiddlewareFunction {
    return proxy(this.resolveHost, {
      proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        proxyReqOpts.headers.authorization = `Bearer ${this.resolveAccessToken()}`
        console.log(proxyReqOpts.headers)
        return proxyReqOpts
      },
    })
  }
}
