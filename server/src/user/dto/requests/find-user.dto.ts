import { z } from "nestjs-zod/z";
import { createZodDto } from "nestjs-zod";

export const FindUserDtoSchema = z.object({
  email: z.string().describe("Email of the user"),
});

export class FindUserDto extends createZodDto(FindUserDtoSchema) {}
