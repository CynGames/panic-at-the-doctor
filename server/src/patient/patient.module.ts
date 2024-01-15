import { Module } from "@nestjs/common";
import { PatientRepository } from "./patient.repository";

@Module({
  providers: [PatientRepository],
  exports: [PatientRepository],
})
export class PatientModule {}
