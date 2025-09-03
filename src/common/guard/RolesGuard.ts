import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RolesDecorator } from '../decorators/RolesDecorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // console.log('guard context:', context.switchToHttp().getRequest());
    const roles = this.reflector.get(RolesDecorator, context.getHandler()); // eslint-disable-line
    console.log('roles:', roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest(); // eslint-disable-line
    const userRoles = ['admin', 'user']; // eslint-disable-line
    return this.matchRoles(roles, userRoles); // eslint-disable-line
  }

  matchRoles(roles: any, userRoles: any) {
    console.log(roles, userRoles);
    return true;
  }
}
