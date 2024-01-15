import { parseISO } from "date-fns";
import { z } from "zod";
import { createZodDto } from "nestjs-zod";

export const BookAppointmentDtoSchema = z.object({
  doctorId: z.string(),
  startTime: z
    .string()
    .datetime()
    .transform((value) => parseISO(value)),
});

export class BookAppointmentDto extends createZodDto(
  BookAppointmentDtoSchema,
) {}
