import { InjectionKey } from "@nuxtjs/composition-api";
import { GlobalState } from '../state/globalState'

const GlobalKey: InjectionKey<GlobalState> = Symbol('globalState')

export default GlobalKey;