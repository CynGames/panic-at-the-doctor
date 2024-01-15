import { Body, Controller, Get, Post } from "@nestjs/common";
import { DoctorService } from "./doctor.service";
import { AuthUser, WithAuthUser } from "../shared/decorator/auth-user";
import { Roles } from "../shared/decorator/roles";
import { GetDoctorAvailabilityDto } from "./dto/requests/find-doctor-availability";
import { RequestDoctorAvailabilityDto } from "./dto/requests/doctor-availability-request.dto";

@Controller("doctors")
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Roles("PATIENT")
  @Post("available-at")
  async getDoctorAvailability(@Body() body: GetDoctorAvailabilityDto) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const date = new Date(body.requestedTime);
    const dayIndex = date.getUTCDay();

    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    const requestedTime = {
      day: daysOfWeek[dayIndex],
      startTime: `${hours}:${minutes}`,
    };

    console.log(requestedTime);

    return await this.doctorService.getDoctorAvailability(requestedTime);
  }

  @Roles("DOCTOR")
  @Post("set-availability")
  async setDoctorAvailability(
    @Body() body: RequestDoctorAvailabilityDto,
    @WithAuthUser() user: AuthUser,
  ) {
    const { days } = body;
    
    const newAvailability = days.map((day: any) => {
      return {
        day: day.day,
        startTime: day.startTime,
        endTime: day.endTime,
      };
    });

    await this.doctorService.setDoctorAvailability(user.id, newAvailability);
  }
}
