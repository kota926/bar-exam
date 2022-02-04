<template>
    <div>
        <v-card>
            <v-card-title
            class="text-body-2 text-sm-h6"
            >{{ year }}年 第{{ q_number }}問 第{{ c_number }}択
            </v-card-title>
            <v-card-text>
                {{ state.choices[state.index].question.question }}
            </v-card-text>
        </v-card>
        <cons-test />
        <test-answer />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from '@nuxtjs/composition-api'
import { ChoiceState } from '../composables/state/choiceState'
import ChoiceKey from '../composables/key/choiceKey'
import ConsTest from './subject/ConsTest.vue'
import TestAnswer from './TestAnswer.vue'

export default defineComponent({
  components: { ConsTest, TestAnswer },
    setup (props) {
        const { state } = inject(ChoiceKey) as ChoiceState
        const year = computed(() => {
            return state.choices[state.index].id.slice(3, 7)
        })
        const q_number = computed(() => {
            if(state.choices[state.index].id.slice(7, 8) === '0') {
                return state.choices[state.index].id.slice(8, 9)
            } else {
                return state.choices[state.index].id.slice(7, 9)
            }
        })
        const c_number = computed(() => {
            return state.choices[state.index].id.slice(9)
        })
        return {
            state,
            year,
            q_number,
            c_number
        }
    }
})
</script>

<style scoped>

</style>