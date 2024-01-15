import { Module } from "@nestjs/common";
import { DoctorService } from "./doctor.service";
import { DoctorRepository } from "./doctor.repository";
import { DoctorController } from "./doctor.controller";

@Module({
  controllers: [DoctorController],
  providers: [DoctorService, DoctorRepository],
  exports: [DoctorRepository],
})
export class DoctorModule {}
