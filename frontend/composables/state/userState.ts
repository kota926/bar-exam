import { reactive } from "@nuxtjs/composition-api";
import { User } from '../../types/User'

export default function userState() {
    const state = reactive<{
        email: string
        user: User | null
    }>({
        email: "sample@gmail.com",
        user: null,
    })

    const mutateEmail = (email: string) => {
        state.email = email
    }

    const setUser = (user: User) => {
        state.user = user
    }

    return {
        state,
        mutateEmail,
        setUser,
    }
}

export type UserState = ReturnType<typeof userState>