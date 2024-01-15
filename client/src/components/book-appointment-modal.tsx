import {FC, useEffect, useRef, useState} from "react";
import {Autocomplete} from "./autocomplete";
import {bookAppointment, getDoctorsAvailableToBook} from "../api/appointments";
import {useBookAppointment} from "../state/book-appointment";
import {useDoctorsAvailableToBook} from "../state/doctors-available-to-book";


export const BookAppointmentModal: FC = () => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const isBooking = useBookAppointment(s => s.isBooking)
    const isFormComplete = useBookAppointment(s => s.isFormComplete)
    const stopBooking = useBookAppointment(s => s.stopBooking)
    const bookingDate = useBookAppointment(s => s.date)
    const doctorId = useBookAppointment(s => s.doctorId)
    const setDoctor = useBookAppointment(s => s.setDoctor)
    const doctors = useDoctorsAvailableToBook(s => s.doctors)
    const clearDoctors = useDoctorsAvailableToBook(s => s.clearDoctors)
    const setDoctors = useDoctorsAvailableToBook(s => s.setDoctors)

    useEffect(() => {
        if (bookingDate) {
            clearDoctors();
            getDoctorsAvailableToBook(bookingDate).then(setDoctors);
        }
    }, [bookingDate]);


    return isBooking ?  (
        <dialog ref={modalRef} className="modal" onClose={stopBooking} open>
            <div className="modal-box h-2/6">
                <h3 className="font-bold text-lg">Book an appointment</h3>
                Doctor
                <Autocomplete items={doctors.map(doctor=>({
                    key: doctor.id,
                    value: doctor.firstName
                }))} onChange={(x)=> {setDoctor(x.key)}} value={doctorId} />
                Date
                <input type="text" className="input input-bordered w-full max-w-xs" readOnly={true} disabled={true} value={bookingDate?.toString() ?? ""} />


                <button disabled={!isFormComplete()} className="btn btn-primary" onClick={ () => {
                    if(!doctorId || !bookingDate) return;
                    
                    void bookAppointment({
                        doctorId: doctorId,
                        startTime: bookingDate,
                    })
                }}>Book</button>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    ) : null
}
