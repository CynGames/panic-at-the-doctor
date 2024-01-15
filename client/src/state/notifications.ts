import {combine} from "zustand/middleware";
import {create} from "zustand";

export interface Notification {
    message: string
}

export const useNotifications = create(combine({
    notificationsMap: new Map<string, Notification>(),
}, (set,get)=> ({
    notifications: ()=> Array.from(get().notificationsMap.values()),
    addNotification: (message: string) => {

        const id = globalThis.crypto.randomUUID()

        set((state) => ({
            notificationsMap: new Map(state.notificationsMap).set(id, {message})
        }))

        setTimeout(()=> {
            set((state) => {
                const newMap = new Map(state.notificationsMap)
                newMap.delete(id)


                return ({
                    notificationsMap: newMap
                })
            })
            },
            3000)

    }
})))
