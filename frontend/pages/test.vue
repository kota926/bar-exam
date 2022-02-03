<template>
    <div>
        <unit-chip />
    </div>
</template>

<script lang="ts">
import { defineComponent, useContext, useAsync, useRoute, onMounted, inject } from '@nuxtjs/composition-api'

import { Choice } from "../types/Choice"

import { ChoiceState } from '../composables/state/choiceState'
import ChoiceKey from '../composables/key/choiceKey'
import UnitChip from '../components/UnitChip.vue'

export default defineComponent({
  components: { UnitChip },
    layout: 'list',
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