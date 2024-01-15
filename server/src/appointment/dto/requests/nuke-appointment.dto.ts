import { z } from "zod";
import { createZodDto } from "nestjs-zod";

export const NukeAppointmentDtoSchema = z.object({
  appointmentId: z.string(),
});

export class NukeAppointmentDto extends createZodDto(
  NukeAppointmentDtoSchema,
) {}
