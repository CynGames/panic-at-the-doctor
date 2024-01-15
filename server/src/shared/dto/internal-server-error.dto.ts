import { ApiProperty } from "@nestjs/swagger";

export class InternalServerErrorDto {
  constructor(message: string) {
    this.statusCode = 500;
    this.message = message;
    this.error = "Internal server error";
  }

  @ApiProperty({
    example: "500",
  })
  statusCode: number;

  @ApiProperty({
    example: "reason",
  })
  message: string;

  @ApiProperty({
    example: "Internal server error",
  })
  error: string;
}
