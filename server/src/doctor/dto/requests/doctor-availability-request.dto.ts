import { z } from "zod";
import { createZodDto } from "nestjs-zod";

export const RequestDoctorAvailabilitySchemaDto = z.object({
  days: z.array(
    z.object({
      day: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    }),
  ),
});

export class RequestDoctorAvailabilityDto extends createZodDto(
  RequestDoctorAvailabilitySchemaDto,
) {}
