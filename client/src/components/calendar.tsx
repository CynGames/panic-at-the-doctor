'use client'
import "react-big-calendar/lib/css/react-big-calendar.css"
import {Calendar, dateFnsLocalizer, Event} from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import {useBookAppointment} from "../state/book-appointment";
import {useRouter} from "next/navigation";
import {useUserState} from "@/state/user";
import {useAppointments} from "../state/appointments";
import {addHours, addMinutes} from "date-fns";
import {Fragment, useEffect} from "react";
import {getPatientAppointments, nukeAppointment} from "../api/appointments";
import { FaTrashCan } from "react-icons/fa6";

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export interface CalendarAppointement extends Event {
    appointmentId: string
}

export const MyCalendar = () => {
  const startBooking = useBookAppointment((state) => state.startBooking)

  // const handleLogoff = () => {
  //   signOff()
  // }

  const appointments = useAppointments((state) => state.appointments)

    useEffect(() => {
        void getPatientAppointments()
    }, []);


  return (
    <div>
      <Calendar<CalendarAppointement>
        defaultView={'day'}
        toolbar={true}
        localizer={localizer}
        events={appointments?.map((appointment) => ({
          title: 'APPO',
          start: appointment.startTime,
          end: addMinutes(appointment.startTime, 59),
            appointmentId: appointment.id
        }))}
        style={{width: 800}}
        selectable={true}
        step={60}
        timeslots={1}
        components={{
            event: (props) => {

                return (
                    <Fragment key={props.event.appointmentId}>
                        {props.event.title}
                        <button onClick={()=>{
                            void nukeAppointment(props.event.appointmentId)
                        }}>
                            <FaTrashCan />
                        </button>
                    </Fragment>
                )
            },
        }}
        onSelecting={()=>{
          return false
        }}
        onSelectSlot={(slotInfo) => {
          console.log(slotInfo)
          startBooking(slotInfo.start)
        }}
      />
    </div>
  )
}
