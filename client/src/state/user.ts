import {create} from "zustand";
import {combine} from "zustand/middleware";

export const useUserState = create(combine({
    userId: null as string | null,
    firstName: null as string | null,
    role: null as string | null,
    token: null as string | null,
}, (set, get) => ({
    signIn: (userId: string, firstName: string, role: string, token: string) => set({token, firstName, role, userId}),
    signOff: () => set({token: null, firstName: null, role: null, userId: null}),
})))