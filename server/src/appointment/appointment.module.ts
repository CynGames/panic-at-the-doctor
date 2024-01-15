import { Module } from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { AppointmentRepository } from "./appointment.repository";
import { AppointmentController } from "./appointment.controller";
import { CoreModule } from "../core/core.module";

@Module({
  imports: [CoreModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentRepository],
})
export class AppointmentModule {}
