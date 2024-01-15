import { ValidSpecs } from "../../auth/model/plain/auth";

export interface Doctor {
  id: string;
  spec?: ValidSpecs;
}

export interface DoctorAvailability {
  id: string;
  firstName: string;
  lastName: string;
  spec: ValidSpecs;
}

export interface AvailableTimeRange {
  day: string;
  startTime: string;
  endTime: string;
}
