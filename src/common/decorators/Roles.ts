// import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../enums/RolesEnum';

/**
 * 使用 Reflector.createDecorator 方法创建一个 @RolesDecorator() 装饰器，它会将元数据附加到处理程序上
 * Reflector 是框架自带的，并已在 @nestjs/core 包中公开。
 */
// export const RolesDecorator = Reflector.createDecorator<string[]>();

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles);
