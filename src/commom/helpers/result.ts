import { ApiProperty } from '@nestjs/swagger';

export class ResponseMessage {
  @ApiProperty()
  public message: string;
}

export class Result {
  public static message(message: string): ResponseMessage {
    return { message };
  }
}
