import { defineEvent, PayloadOf } from "./base";

export interface AppointmentNukedPayload {
  appointmentId: string;
  doctorId: string;
  patientId: string;
}

export const AppointmentNuked =
  defineEvent<AppointmentNukedPayload>("appointment-nuked");
export type AppointmentNuked = InstanceType<typeof AppointmentNuked>;
