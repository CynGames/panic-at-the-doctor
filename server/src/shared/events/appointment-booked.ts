import { defineEvent, PayloadOf } from "./base";

export interface AppointmentBookedPayload {
  appointmentId: string;
  doctorId: string;
  patientId: string;
}

export const AppointmentBooked =
  defineEvent<AppointmentBookedPayload>("appointment-booked");
export type AppointmentBooked = InstanceType<typeof AppointmentBooked>;
