import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { BookAppointmentDto } from "./dto/requests/book-appointment.dto";
import { AuthUser, WithAuthUser } from "../shared/decorator/auth-user";
import { Appointment } from "./model/appointment";
import { NukeAppointmentDto } from "./dto/requests/nuke-appointment.dto";

@Controller("appointments")
export class AppointmentController {
  constructor(private readonly service: AppointmentService) {}

  @Post("book")
  async bookAppointment(
    @Body() body: BookAppointmentDto,
    @WithAuthUser() user: AuthUser,
  ): Promise<{ id: string }> {
    const appointmentId = await this.service.bookAppointment({
      doctorId: body.doctorId,
      patientId: user.id,
      startTime: body.startTime,
    });

    return { id: appointmentId };
  }

  @Delete("nuke")
  async nukeAppointment(
    @Body() body: NukeAppointmentDto,
    @WithAuthUser() user: AuthUser,
  ): Promise<string> {
    await this.service.nukeAppointment({
      appointmentId: body.appointmentId,
      patientId: user.id,
    });

    return "OK";
  }

  @Get("for-doctor")
  async getDoctorAppointments(
    @WithAuthUser() user: AuthUser,
  ): Promise<Appointment[]> {
    return this.service.findDoctorAppointments(user.id);
  }

  @Get("for-patient")
  async getPatientAppointments(
    @WithAuthUser() user: AuthUser,
  ): Promise<Appointment[]> {
    return this.service.findPatientAppointments(user.id);
  }
}
