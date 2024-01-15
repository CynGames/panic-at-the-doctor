import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { DoctorRepository } from "../doctor/doctor.repository";
import { PatientRepository } from "../patient/patient.repository";
import { UserController } from "./user.controller";

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserRepository,
    DoctorRepository,
    PatientRepository,
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}
