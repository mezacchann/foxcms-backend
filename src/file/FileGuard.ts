import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { FileService } from './FileService'

@Injectable()
export class FileGuard implements CanActivate {
  constructor(private readonly fileService: FileService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const fileId = request.params.fileId
    if (!fileId || !this.fileService.getFile(fileId, request.user)) {
      return false
    }
    return true
  }
}
