import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

import * as bcrypt from 'bcrypt';

export class UpdateUserInput {
  @ApiProperty({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ nullable: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((e) => e.newPassword)
  oldPassword?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => bcrypt.hashSync(value, 10))
  newPassword?: string;
}
