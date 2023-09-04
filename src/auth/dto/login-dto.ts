import { ApiProperty } from '@nestjs/swagger';

export class LoginInput {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class LoginResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  refresh_token: string;

  constructor(login?: Partial<LoginResponse>) {
    this.id = login.id;
    this.email = login.email;
    this.name = login.name;
    this.role = login.role;
    this.token = login.token;
    this.refresh_token = login.refresh_token;
  }
}

export class RefreshTokenInput {
  @ApiProperty()
  refresh_token: string;
}
