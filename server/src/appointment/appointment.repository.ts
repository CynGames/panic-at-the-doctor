import { DbService } from "../core/db/db";
import { appointmentsTable } from "../core/db/schema";
import { eq, gt } from "drizzle-orm";
import { Appointment } from "./model/appointment";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppointmentRepository {
  constructor(private readonly db: DbService) {}

  async save(appointment: Appointment): Promise<void> {
    await this.db
      .insert(appointmentsTable)
      .values({
        id: appointment.id,
        doctorId: appointment.doctorId,
        patientId: appointment.patientId,
        startTime: appointment.startTime,
      })
      .onConflictDoUpdate({
        target: appointmentsTable.id,
        set: {
          doctorId: appointment.doctorId,
          patientId: appointment.patientId,
          startTime: appointment.startTime,
        },
      });
  }

  async delete(appointment: Appointment): Promise<void> {
    await this.db
      .delete(appointmentsTable)
      .where(eq(appointmentsTable.id, appointment.id));
  }

  async findById(id: string): Promise<Appointment> {
    const appointment = await this.db.query.appointmentsTable.findFirst({
      where: (appointment) => eq(appointment.id, id),
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    return appointment;
  }

  async findDoctorFutureAppointments(
    doctorId: string,
    startTime: Date,
  ): Promise<Appointment[]> {
    const appointments = await this.db.query.appointmentsTable.findMany({
      where: (appointment) => gt(appointment.startTime, startTime),
    });
    return appointments;
  }

  async findPatientFutureAppointments(
    patientId: string,
    startTime: Date,
  ): Promise<Appointment[]> {
    const appointments = await this.db.query.appointmentsTable.findMany({
      where: (appointment) => gt(appointment.startTime, startTime),
    });
    return appointments;
  }

  async findDoctorAppointments(doctorId: string): Promise<Appointment[]> {
    const appointments = await this.db.query.appointmentsTable.findMany({
      where: (appointment) => eq(appointment.doctorId, doctorId),
    });
    return appointments;
  }

  async findPatientAppointments(patientId: string): Promise<Appointment[]> {
    const appointments = await this.db.query.appointmentsTable.findMany({
      where: (appointment) => eq(appointment.patientId, patientId),
    });
    return appointments;
  }
}
