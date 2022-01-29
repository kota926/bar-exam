import { reactive, computed, watch } from "@nuxtjs/composition-api";
import { Choice } from "../../types/Choice"

export default function choiceState() {
    const state = reactive<{
        choices: Choice[]
        index: number
        isCorrect: boolean
        hideResult: boolean
    }>({
        choices: [],
        index: 0,
        isCorrect: true,
        hideResult: true,
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
    }

    const switchHideResult = () => {
        state.hideResult = !state.hideResult
    }

    const increaseIndex = () => {
        state.index = state.index + 1
    }

    const currentChoice = computed(() => {
        return state.choices[state.index]
    })

    return {
        state,
        setIndex,
        setChioces,
        setAnswer,
        switchHideResult,
        increaseIndex,
        currentChoice
    }
}

export type ChoiceState = ReturnType<typeof choiceState>