import { Injectable } from "@nestjs/common";
import { db } from "../core/db/db";
import {
  doctorAvailabilityTable,
  doctorTable,
  userTable,
} from "../core/db/schema";
import { randomUUID } from "crypto";
import { eq, inArray } from "drizzle-orm";
import { AvailableTimeRange, Doctor, DoctorAvailability } from "./model/doctor";

@Injectable()
export class DoctorRepository {
  async getDoctorAvailability(
    day: string,
    startTime: string,
  ): Promise<DoctorAvailability[]> {
    const timeSlots = await db.query.doctorAvailabilityTable.findMany({
      where: (availability) => eq(availability.day, day),
    });

    // TODO: Replace and slice startTime and endTime to get rid of ":" and seconds before inserting into db
    const relevantTimeSlots = timeSlots.map((timeSlot) => {
      return {
        id: timeSlot.id,
        doctorId: timeSlot.doctorId,
        day: timeSlot.day,
        startTime: timeSlot.startTime.replace(":", "").slice(0, 4),
        endTime: timeSlot.endTime.replace(":", "").slice(0, 4),
      };
    });

    const availableTimeSlots = relevantTimeSlots.filter((timeSlot) => {
      return timeSlot.startTime <= startTime && timeSlot.endTime >= startTime;
    });
    
    if (availableTimeSlots.length === 0) {
      return [];
    }

    const result = await db
      .select({
        id: doctorTable.id,
        firstName: userTable.firstName,
        lastName: userTable.lastName,
        spec: doctorTable.spec,
      })
      .from(doctorTable)
      .leftJoin(userTable, eq(doctorTable.id, userTable.id))
      .where((doctor) =>
        inArray(
          doctor.id,
          availableTimeSlots.map((timeSlot) => timeSlot.doctorId),
        ),
      );

    return result.map((doctor) => {
      return {
        id: doctor.id,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        spec: doctor.spec,
      } as DoctorAvailability;
    });
  }

  async setDoctorAvailability(
    timeRange: AvailableTimeRange[],
    doctorId: string
  ): Promise<AvailableTimeRange[]> {
    return db
      .insert(doctorAvailabilityTable)
      .values(
        timeRange.map((timeRange) => {
          return {
            id: randomUUID(),
            doctorId: doctorId,
            day: timeRange.day,
            startTime: timeRange.startTime,
            endTime: timeRange.endTime,
          };
        }),
      )
      .returning();
  }

  async deleteDoctorAvailability(doctorId: string): Promise<void> {
    await db
      .delete(doctorAvailabilityTable)
      .where(eq(doctorAvailabilityTable.doctorId, doctorId));

    console.log("Availabilities for a doctor deleted");
  }

  async createDoctor(doctorData: Doctor): Promise<void> {
    await db
      .insert(doctorTable)
      .values({ id: doctorData.id, spec: doctorData.spec! });

    console.log("Doctor created");
  }
}
