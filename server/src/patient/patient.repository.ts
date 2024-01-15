import { Injectable } from "@nestjs/common";
import { db } from "../core/db/db";
import { patientTable } from "../core/db/schema";
import { Patient } from "./model/patient";

@Injectable()
export class PatientRepository {
  constructor() {}

  async createPatient(input: Patient): Promise<Patient> {
    const patient = await db
      .insert(patientTable)
      .values({ id: input.id })
      .returning();

    return patient[0];
  }
}
