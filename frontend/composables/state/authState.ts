import { reactive } from "@nuxtjs/composition-api";

export default function authState() {
    const state = reactive({
        email: "sample@gmail.com"
    })

    const mutateEmail = (email: string) => {
        state.email = email
    }

    return {
        state,
        mutateEmail,
    }
}

export type AuthState = ReturnType<typeof authState>