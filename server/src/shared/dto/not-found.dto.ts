import { ApiProperty } from "@nestjs/swagger";

export class NotFoundDto {
  constructor(message: string) {
    this.statusCode = 404;
    this.message = message;
  }

  @ApiProperty({
    example: "404",
  })
  statusCode: number;

  @ApiProperty({
    example: "Not Found",
  })
  message: string;
}
