import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split(' ')[1];
    const user = await this.userService.getByToken(token);
    request.user = user;
    return !!user;
  }
}
