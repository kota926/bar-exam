import { InjectionKey } from "@nuxtjs/composition-api";
import { UserState } from '../state/userState'

const UserKey: InjectionKey<UserState> = Symbol('userState')

export default UserKey;