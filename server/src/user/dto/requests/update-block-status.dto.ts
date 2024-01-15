import { z } from "zod";
import { createZodDto } from "nestjs-zod";

export const UpdateBlockStatusDtoSchema = z.object({
  email: z.string(),
  isActive: z.boolean(),
});

export class UpdateBlockStatusDto extends createZodDto(
  UpdateBlockStatusDtoSchema,
) {}
