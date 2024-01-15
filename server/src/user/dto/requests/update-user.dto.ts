import { z } from "zod";
import { ValidRoles } from "../../../auth/model/plain/auth";
import { createZodDto } from "nestjs-zod";

export const UserUpdateDtoSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  isActive: z.boolean(),
  role: z.enum([ValidRoles.Doctor, ValidRoles.Patient]),
});

export class UpdateUserDto extends createZodDto(UserUpdateDtoSchema) {}
