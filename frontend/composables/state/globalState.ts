import { reactive, computed, watch } from "@nuxtjs/composition-api";
import { Choice } from "../../types/Choice"
import { User } from '../../types/User'

export default function globalState() {
    const state = reactive<{
        choices: Choice[]
        index: number
        isCorrect: boolean
        answerArray: Array<boolean>
        isOverlay: boolean
        isResult: boolean
        isComplete: boolean
        email: string
        user: User | null
        record: any
        totalNumber: number | null
    }>({
        choices: [],
        index: 0,
        isCorrect: true,
        answerArray: [],
        isOverlay: false,
        isResult: true,
        isComplete: false,
        email: "sample@gmail.com",
        user: null,
        record: null,
        totalNumber: null,

    })

    const setIndex = (index: number) => {
        if(typeof index === 'number') {
            state.index = index
        }
    }

    const setChioces = (choices: Choice[]) => {
        state.choices = choices
    }

    const setAnswer = (yourAnswer: boolean) => {
        state.isCorrect = yourAnswer
        state.answerArray.push(yourAnswer)
    }

    const setOverlay = (isOverlay: boolean) => {
        state.isOverlay = isOverlay
    }

    const switchHideResult = () => {
        state.isResult = !state.isResult
    }

    const increaseIndex = () => {
        state.index = state.index + 1
        if(state.choices.length === state.index) {
            state.isComplete = true
            state.index = 0
        }
    }

    const setComplete = (isComplete: boolean) => {
        state.isComplete = isComplete
    }

    const currentChoice = computed(() => {
        return state.choices[state.index]
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

    const setTotalNumber = (num: number) => {
        state.totalNumber = num
    }

    return {
        state,
        setIndex,
        setChioces,
        setAnswer,
        setOverlay,
        switchHideResult,
        increaseIndex,
        setComplete,
        currentChoice,
        mutateEmail,
        setUser,
        setRecord,
        setTotalNumber,
    }
}

export type GlobalState = ReturnType<typeof globalState>