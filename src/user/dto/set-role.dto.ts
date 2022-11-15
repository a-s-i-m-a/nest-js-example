import { UserRole } from '../types/user-roles';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class SetRoleDto {
  @IsNotEmpty()
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];
}
