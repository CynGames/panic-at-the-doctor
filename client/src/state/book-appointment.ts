import {create} from "zustand";
import {combine} from "zustand/middleware";


export const useBookAppointment = create(combine({
  date: null as Date | null,
  doctorId: null as string | null,
  isBooking: false  as boolean,
},(set, get) => ({

  startBooking: (date: Date) => set({date, isBooking: true}),
  setDoctor: (doctorId: string) => set({doctorId}),
  stopBooking: () => set({date: null, doctorId: null, isBooking: false}),
  isFormComplete: () => get().date !== null && get().doctorId !== null,

})))



