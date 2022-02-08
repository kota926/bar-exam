import { InjectionKey } from "@nuxtjs/composition-api";
import { AuthState } from '../state/authState'

const AuthKey: InjectionKey<AuthState> = Symbol('authState')

export default AuthKey;