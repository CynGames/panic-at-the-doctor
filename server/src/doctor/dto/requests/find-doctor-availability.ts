import {z} from "zod";
import {createZodDto} from "nestjs-zod";

export const GetDoctorAvailabilitySchemaDto = z.object({
  requestedTime: z.string(),
});

export class GetDoctorAvailabilityDto extends createZodDto(GetDoctorAvailabilitySchemaDto) {}
