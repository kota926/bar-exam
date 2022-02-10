<template>
    <div>
        <tab-bar>
            <unit-chip />
            <hidden-text-card
            v-for="(choice, index) in choices" :key="index"
            :choice="choice"
            />
        </tab-bar>
        <bottom-nav />
        <!-- <hidden-text
        v-for="(question, index) in questions" :key="index"
        :question="question"
        /> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, useContext, useAsync, useRoute, onMounted, inject } from '@nuxtjs/composition-api'
import HiddenText from '../components/HiddenText.vue'

import { Choice } from "../types/Choice"

import { ChoiceState } from '../composables/state/choiceState'
import ChoiceKey from '../composables/key/choiceKey'
import UnitChip from '../components/UnitChip.vue'
import TabBar from '../components/TabBar.vue'
import BottomNav from '../components/BottomNav.vue'

export default defineComponent({
  components: { HiddenText, UnitChip, TabBar, BottomNav },
    layout: 'default',
    // async asyncData(context: any) {
    //     console.log(context)
    //     const questions = await context.$axios.$get('/api/question')
    //     // const questions = await context.$axios.$get('/api/sample')
    //     console.log(questions)
    //     return questions
    // },
    setup () {
        const { $axios } = useContext()
        const route = useRoute()
        const { setChioces } = inject(ChoiceKey) as ChoiceState
        // onMounted(() => {
        //     console.log(useContext())
        //     console.log($axios)})
        // const questions = useAsync(() => {
        //     return $axios.$get('/api/choice', {
        //         params: {
        //             subject: "憲法",
        //             unit: "10",
        //         }
        //     })
        // })
        const choices = useAsync(() => {
            return $axios.$get('/api/choice', {
                params: {
                    subject: route.value.query.subject,
                    unit: route.value.query.unit,
                }
            })
        })
        // setChioces(choices)
        return {
            // questions
            choices
        }
    }
})
</script>

<style scoped>

</style>