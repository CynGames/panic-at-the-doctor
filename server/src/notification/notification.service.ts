import { Injectable } from "@nestjs/common";
import { MainGateway } from "../core/main.gateway";
import { OnEvent } from "@nestjs/event-emitter";
import { PayloadOf } from "../shared/events/base";
import { AppointmentBooked } from "../shared/events/appointment-booked";
import { AppointmentNuked } from "../shared/events/appointment-nuked";

@Injectable()
export class NotificationService {
  constructor(private readonly gateway: MainGateway) {}

  @OnEvent(AppointmentBooked.eventName)
  sendAppointmentBookedNotification(payload: PayloadOf<AppointmentBooked>) {
    this.gateway.sendToUser(payload.doctorId, {
      event: "appointment-booked",
      data: null,
    });
    this.gateway.sendToUser(payload.patientId, {
      event: "appointment-booked",
      data: null,
    });
  }

  @OnEvent(AppointmentNuked.eventName)
  sendAppointmentNukedNotification(payload: PayloadOf<AppointmentNuked>) {
    this.gateway.sendToUser(payload.doctorId, {
      event: "appointment-nuked",
      data: null,
    });
    this.gateway.sendToUser(payload.patientId, {
      event: "appointment-nuked",
      data: null,
    });
  }
}
