import { Injectable } from "@nestjs/common";
import { DoctorRepository } from "./doctor.repository";

@Injectable()
export class DoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async getDoctorAvailability(requestedTime: {
    day: string;
    startTime: string;
  }): Promise<any> {
    const { day, startTime } = requestedTime;

    return await this.doctorRepository.getDoctorAvailability(day, startTime);
  }

  async setDoctorAvailability(doctorId: string, timeRange: any): Promise<void> {
    await this.doctorRepository.deleteDoctorAvailability(doctorId);

    if (!timeRange.length) return;

    await this.doctorRepository.setDoctorAvailability(timeRange, doctorId);
  }
}
