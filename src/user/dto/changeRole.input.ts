import { ApiProperty } from '@nestjs/swagger';
import { Role } from './create-user.input';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class ChangeRoleInput {
  @ApiProperty({ enum: Role })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
