'use client'
import {MyCalendar} from "./calendar";
import {useUserState} from "../state/user";
import {useEffect, useRef, useState} from "react";
import {Autocomplete} from "./autocomplete";
import {useBookAppointment} from "../state/book-appointment";
import { useRouter} from "next/navigation";
import {bookAppointment} from "../api/appointments";
import {useNotifications} from "../state/notifications";
import {AvailabilityModal} from "@/components/availabilityModal";
import {BookAppointmentModal} from "./book-appointment-modal";

export const  Main = () => {
  const router = useRouter();
  const {signOff} = useUserState()
  const [showModal, setShowModal] = useState(false);

  const modalRef = useRef<HTMLDialogElement>(null);
  const user = useUserState(s => s.firstName)
  const role = useUserState(s => s.role)

  const notifications = useNotifications()

  if (!user) router.push('/sign-in')

  const handleLogoff = () => {
    signOff()
  }


  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div data-theme="light">

      <div className="top-0 right-0 m-4">
        <button className="btn" onClick={handleLogoff}>Logout</button>
      </div>

      LOGGED IN AS {user}
      <div />
      ROLE IS = {role}
      {!!user && <MyCalendar/>}

     <BookAppointmentModal />

      <div className="toast toast-end">
          {notifications.notifications().map((notification) => (
              <div className="alert alert-info">
                  <span>{notification.message}</span>
              </div>
          ))}
      </div>
      
      {role === 'DOCTOR' && <button className="btn" onClick={handleOpenModal}>Set Availability</button>}
      {showModal && <AvailabilityModal onClose={handleCloseModal} />}

    </div>
  )
}
