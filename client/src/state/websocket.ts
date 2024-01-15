import {create} from "zustand";
import {combine} from "zustand/middleware";
import {useUserState} from "./user";
import {useNotifications} from "./notifications";
import {Appointment} from "./appointments";
import {getPatientAppointments} from "../api/appointments";

export class AppWebsocket {
    private ws: null | WebSocket = null;

    constructor(
        private readonly url: string,
    ) {
        this.subscribeToUser();
        this.connect();
    }

    private connect() {
        if (this.ws) {
            this.ws.onerror = null;
            this.ws.onclose = null;
            this.ws.onopen = null;
            this.ws.close()
            this.ws = null;
        }

        const ws = new WebSocket(this.url);
        ws.onmessage = ({data}) => {
            const dataObject = JSON.parse(data.toString()) as {event: string, data: unknown};

            if (dataObject.event === 'appointment-booked') {
                useNotifications.getState().addNotification('New appointment !!!');
                void getPatientAppointments()
            }
            if (dataObject.event === 'appointment-nuked') {
                useNotifications.getState().addNotification('Appointment Nuked !!!');
                void getPatientAppointments()
            }

        }

        ws.onopen = () => {
            console.log("open")
            this.signIn();
        }

        ws.onerror = () => {
            this.connect();
        }

        ws.onclose = () => {
            this.connect()
        }
        this.ws = ws;
    }

    private subscribeToUser() {
        useUserState.subscribe((user) => {
            if (user.token) this.signIn();
            else this.signOut();
        })
    }

    private signIn() {
        const token = useUserState.getState().token;
        if (token) {
            this.ws?.send(JSON.stringify({
                event: "sign-in",
                data: {
                    token,
                }
            }))
        }
    }

    private signOut() {
        this.ws?.send(JSON.stringify({
            event: "sign-out",
        }))
    }

}


export const useWebsocket = create(combine({
    websocket: null as AppWebsocket | null,
}, (set, get) => ({
    setWebsocket: (websocket: AppWebsocket) => set({websocket}),
})))
