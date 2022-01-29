import { InjectionKey } from "@nuxtjs/composition-api";
import { ChoiceState } from '../state/choiceState'

const ChoiceKey: InjectionKey<ChoiceState> = Symbol('choiceState')

export default ChoiceKey;