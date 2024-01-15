import {create} from "zustand";
import {combine} from "zustand/middleware";


export const useDoctorsAvailableToBook = create(
    combine({
        doctors: [] as {id: string, firstName: string}[]
    }, (
        set
    )=>({
        setDoctors: (doctors: {id: string, firstName: string}[]) => set({doctors}),
        clearDoctors: () => set({doctors: []})
    }))
)
