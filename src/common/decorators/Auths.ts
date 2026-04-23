import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../enums/RolesEnum';

export interface IAuth {
  roles: RolesEnum;
  permission: string;
}

export const AUTHS_KEY = 'auths';
export const Auths = (...auths: Array<IAuth>) => SetMetadata(AUTHS_KEY, auths);
