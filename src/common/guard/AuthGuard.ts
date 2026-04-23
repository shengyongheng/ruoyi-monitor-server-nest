import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { AUTHS_KEY, IAuth } from '../decorators/Auths';
import { SysRedisService } from 'src/modules/system/sys-redis/sys-redis.service';
import { SysRedisEnum } from 'src/modules/system/sys-redis/enums/sys-redis.enum';

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
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private redisService: SysRedisService,
    private reflector: Reflector,
  ) {}

  async canActivate(
    /**
     * ExecutionContext 类的使用: https://docs.nestjs.com/fundamentals/execution-context#executioncontext-class
     */
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // 💡 Here the JWT secret key that's used for verifying the payload
      // is the key that was passed in the JwtModule
      const payload = await this.jwtService.verifyAsync<object>(token);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    const auths = this.reflector.getAllAndOverride<IAuth[]>(AUTHS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('auths:', auths);
    if (!auths) {
      return true;
    }
    const { roles, permission } = (await this.redisService.get<IAuth>(
      SysRedisEnum.AUTHS_KEY,
    )) || { roles: '', permission: '' };
    console.log('roles:', roles);
    console.log('permission:', permission);
    return this.validateAuths(auths, roles, permission);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private validateAuths(auths: IAuth[], roles: string, permission: string) {
    return (
      auths[0].roles.valueOf() === roles && auths[0].permission === permission
    );
  }
}
