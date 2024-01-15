import { Injectable } from "@nestjs/common";
import { AppointmentRepository } from "../appointment/appointment.repository";
import { UserRepository } from "../user/user.repository";
import { db } from "../core/db/db";
import { ValidRoles, ValidSpecs } from "../auth/model/plain/auth";
import { UserService } from "../user/user.service";
import {
  appointmentsTable,
  doctorTable,
  patientTable,
  userTable,
} from "../core/db/schema";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class SeedService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async executeSeed() {
    if (process.env.SEED === "true") {
      console.log("Seeding data...");

      await this.deleteAllData();
      await this.seedData();
      return true;
    }
  }

  async seedData() {
    await this.loadUsers();
    // await this.loadAppointments();
  }

  async deleteAllData() {
    await db.delete(doctorTable);
    await db.delete(patientTable);
    await db.delete(appointmentsTable);
    await db.delete(userTable);
  }

  async loadUsers() {
    // TODO: Change to write directly on db

    await this.authService.create({
      firstName: "Doctor",
      lastName: "doctor",
      email: "doctor@doctors.com",
      password: "123456",
      isActive: true,
      role: "DOCTOR" as ValidRoles,
      spec: "CARDIOLOGIST" as ValidSpecs,
    });

    // await db.insert(userTable).values({
    //
    // })

    await this.authService.create({
      firstName: "Patient",
      lastName: "patient",
      email: "patient@patients.com",
      password: "123456",
      isActive: true,
      role: "PATIENT" as ValidRoles,
    });
  }
}
