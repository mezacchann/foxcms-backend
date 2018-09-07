import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { ProjectService } from './ProjectService'

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(private readonly projectService: ProjectService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const projectId = request.params.projectId
    if (!projectId || !this.projectService.getProject(projectId, request.user)) {
      return false
    }
    return true
  }
}
