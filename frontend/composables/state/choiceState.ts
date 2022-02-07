import { reactive, computed, watch } from "@nuxtjs/composition-api";
import { Choice } from "../../types/Choice"

export default function choiceState() {
    const state = reactive<{
        choices: Choice[]
        index: number
        isCorrect: boolean
        answerArray: Array<boolean>
        isOverlay: boolean
        isResult: boolean
        isComplete: boolean
    }>({
        choices: [],
        index: 0,
        isCorrect: true,
        answerArray: [],
        isOverlay: false,
        isResult: true,
        isComplete: false,
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
        }
    }

    const currentChoice = computed(() => {
        return state.choices[state.index]
    })

    return {
        state,
        setIndex,
        setChioces,
        setAnswer,
        setOverlay,
        switchHideResult,
        increaseIndex,
        currentChoice
    }
}

export type ChoiceState = ReturnType<typeof choiceState>