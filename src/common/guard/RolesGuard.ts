import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RolesDecorator } from '../decorators/RolesDecorator';

/**
 * 每个守卫都必须实现一个 canActivate() 函数。
 * 该函数应返回一个布尔值，指示当前请求是否被允许。
 * 它可以同步或异步（通过 Promise 或 Observable ）返回响应。
 * Nest 使用返回值来控制下一步操作：
 *  - 如果返回 true ，则请求将被处理。
 *  - 如果返回 false ，Nest 将拒绝该请求。
 *      当守卫返回 false 时，框架会抛出 ForbiddenException 异常。
 *      如果您想返回不同的错误响应，则应该抛出您自己的特定异常。
 *      例如：throw new UnauthorizedException();
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    // 守卫可以访问 ExecutionContext 实例，因此能够准确地知道接下来要执行什么。
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // console.log('guard context:', context.switchToHttp().getRequest());
    const roles = this.reflector.get(RolesDecorator, context.getHandler());
    console.log('roles:', roles);
    if (!roles) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    console.log('request:', request);
    const userRoles = ['admin', 'user'];
    return this.matchRoles(roles, userRoles);
  }

  matchRoles(roles: any, userRoles: any) {
    console.log(roles, userRoles);
    return true;
  }
}
