import {useUserState} from "../state/user";
import {Appointment, useAppointments} from "../state/appointments";

export const BASE_URL = 'http://localhost:8000'


export const getAuthToken = () => useUserState.getState().token


export interface BookAppointment {
    doctorId: string;
    startTime: Date
}

export interface DoctorAvailable {id: string, firstName: string}

export const bookAppointment = async (appointment: BookAppointment ): Promise<void> => {
    const response = await fetch(`${BASE_URL}/appointments/book`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(appointment)
    }).then(res => res.json())

    console.log(response)
}

export const getPatientAppointments = async (): Promise<void> => {
    const response: Appointment[] = await fetch(`${BASE_URL}/appointments/for-patient`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
        },
    }).then((res)=> res.json())

    console.log(response)

    if (!response) return;
    
    useAppointments.setState({appointments: response.map((appointment) => ({...appointment, startTime: new Date(appointment.startTime)}))})
}


export const nukeAppointment = async (appointmentId: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/appointments/nuke`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(
            {appointmentId}
        )
    })

    console.log(response)
}


export const getDoctorsAvailableToBook = async (startTime: Date): Promise<DoctorAvailable[]> => {
    const requestedTime = JSON.stringify({ requestedTime: startTime })
    
    const response: DoctorAvailable[] = await fetch(`${BASE_URL}/doctors/available-at`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
        },
        body: requestedTime
    }).then(res => res.json())

    console.log(response)

    return response
}
