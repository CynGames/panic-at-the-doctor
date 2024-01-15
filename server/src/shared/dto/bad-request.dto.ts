import { ApiProperty } from "@nestjs/swagger";

export class BadRequestDto {
  constructor(message: string) {
    this.statusCode = 400;
    this.message = message;
    this.error = "Bad request";
  }

  @ApiProperty({
    example: "400",
  })
  statusCode: number;

  @ApiProperty({
    example: "reason",
  })
  message: string;

  @ApiProperty({
    example: "Bad request",
  })
  error: string;
}
