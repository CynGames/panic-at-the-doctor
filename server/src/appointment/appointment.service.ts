import {
  Appointment,
  bookAppointment,
  BookAppointmentInput,
  nukeAppointment,
  NukeAppointmentInput,
} from "./model/appointment";
import { Injectable } from "@nestjs/common";
import { AppointmentRepository } from "./appointment.repository";
import { EventPublisherService } from "../core/event-publisher.service";

@Injectable()
export class AppointmentService {
  constructor(
    private readonly repo: AppointmentRepository,
    private readonly events: EventPublisherService,
  ) {}

  async bookAppointment(input: BookAppointmentInput): Promise<string> {
    const currentTime = new Date();

    const doctorSchedule = await this.repo.findDoctorSchedule(input.doctorId);
    
    const doctorAppointments = await this.repo.findDoctorFutureAppointments(
      input.doctorId,
      currentTime,
    );
    
    const patientAppointments = await this.repo.findPatientFutureAppointments(
      input.patientId,
      currentTime,
    );

    const { data: newAppointment, generatedEvents } = bookAppointment(
      input,
      currentTime,
      doctorSchedule,
      doctorAppointments,
      patientAppointments,
    );

    await this.repo.save(newAppointment);

    await this.events.publish(generatedEvents);

    return newAppointment.id;
  }

  async nukeAppointment(input: NukeAppointmentInput) {
    const currentTime = new Date();
    const appointment = await this.repo.findById(input.appointmentId);

    const { data: wasNuked, generatedEvents } = nukeAppointment(
      input,
      currentTime,
      appointment,
    );

    if (wasNuked) {
      await this.repo.delete(appointment);
      await this.events.publish(generatedEvents);
    }
  }

  async findDoctorAppointments(doctorId: string): Promise<Appointment[]> {
    return this.repo.findDoctorAppointments(doctorId);
  }

  async findPatientAppointments(patientId: string): Promise<Appointment[]> {
    return this.repo.findPatientAppointments(patientId);
  }
}
