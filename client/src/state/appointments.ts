import {create} from "zustand";
import {combine} from "zustand/middleware";

export interface Appointment {
    id: string;
    startTime: Date;
    doctorId: string;
    patientId: string;
}

export const useAppointments = create(combine({
    appointments: [] as Appointment[],
}, (set) => ({
    setAppointments: (appointments: Appointment[]) => set({appointments}),
})))
