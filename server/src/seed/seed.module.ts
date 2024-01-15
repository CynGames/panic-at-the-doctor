import { Module } from "@nestjs/common";
import { SeedController } from "./seed.controller";
import { SeedService } from "./seed.service";
import { UserRepository } from "../user/user.repository";
import { AppointmentRepository } from "../appointment/appointment.repository";
import { DoctorRepository } from "../doctor/doctor.repository";
import { PatientRepository } from "../patient/patient.repository";
import { CoreModule } from "../core/core.module";
import { AuthService } from "../auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";

@Module({
  controllers: [SeedController],
  imports: [CoreModule],
  providers: [
    JwtService,
    UserService,
    SeedService,
    AuthService,
    DoctorRepository,
    PatientRepository,
    AppointmentRepository,
    UserRepository,
  ],
})
export class SeedModule {}
