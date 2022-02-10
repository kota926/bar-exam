import { reactive } from "@nuxtjs/composition-api";
import { User } from '../../types/User'

export default function userState() {
    const state = reactive<{
        email: string
        user: User | null
        record: any
    }>({
        email: "sample@gmail.com",
        user: null,
        record: null,
    })

    const mutateEmail = (email: string) => {
        state.email = email
    }

    const setUser = (user: User) => {
        state.user = user
    }

    const setRecord = (record: any) => {
        state.record = record[0]
    }

    return {
        state,
        mutateEmail,
        setUser,
        setRecord,
    }
}

export type UserState = ReturnType<typeof userState>