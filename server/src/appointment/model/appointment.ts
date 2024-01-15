import { randomUUID } from "crypto";
import { AppointmentBooked } from "../../shared/events/appointment-booked";
import { WithEvents } from "../../shared/with-events";
import {
  AppointmentNuked,
  AppointmentNukedPayload,
} from "../../shared/events/appointment-nuked";
import {AvailableTimeRange, DoctorAvailability} from "../../doctor/model/doctor";
import {format} from "date-fns";

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  startTime: Date;
}

export interface BookAppointmentInput {
  doctorId: string;
  patientId: string;
  startTime: Date;
}

export interface NukeAppointmentInput {
  appointmentId: string;
  patientId: string;
}

export const bookAppointment = (
  input: BookAppointmentInput,
  currentTime: Date,
  doctorSchedule: AvailableTimeRange,
  doctorAppointments: Appointment[],
  patientAppointments: Appointment[],
): WithEvents<Appointment> => {
  const { doctorId, patientId, startTime } = input;
  
  console.log('input', input)
  console.log('input', doctorSchedule)
  
  if (currentTime.getTime() >= startTime.getTime())
    throw new Error("Cannot book appointment in the past");

  // TODO validate doc schedule
  if (format(input.startTime, 'E') !== doctorSchedule.day)
    throw new Error("Day is not within the doctor's schedule");
  
  const isDoctorAlreadyBooked = doctorAppointments.some((appointment) => {
    return (
      appointment.startTime.getTime() === startTime.getTime() &&
      appointment.doctorId === doctorId
    );
  });

  if (isDoctorAlreadyBooked)
    throw new Error("Doctor is already booked at that time");

  const isPatientAlreadyBooked = patientAppointments.some((appointment) => {
    return (
      appointment.startTime.getTime() === startTime.getTime() &&
      appointment.patientId === patientId
    );
  });

  if (isPatientAlreadyBooked)
    throw new Error("Patient is already booked at that time");

  const appointment = {
    id: randomUUID(),
    doctorId,
    patientId,
    startTime,
  } satisfies Appointment;

  return {
    data: appointment,
    generatedEvents: [
      new AppointmentBooked({
        appointmentId: appointment.id,
        doctorId: appointment.doctorId,
        patientId: appointment.patientId,
      }),
    ],
  };
};

export const nukeAppointment = (
  input: NukeAppointmentInput,
  currentTime: Date,
  appointment: Appointment,
): WithEvents<boolean> => {
  if (input.patientId !== appointment.patientId)
    throw new Error("Cannot nuke another patient's appointment");
  if (currentTime.getTime() >= appointment.startTime.getTime())
    throw new Error("Cannot nuke appointment in the past");

  return {
    data: true,
    generatedEvents: [
      new AppointmentNuked({
        appointmentId: appointment.id,
        doctorId: appointment.doctorId,
        patientId: appointment.patientId,
      }),
    ],
  };
};
