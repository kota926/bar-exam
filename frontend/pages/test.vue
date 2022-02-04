<template>
    <div>
        <unit-chip />
        <div v-if="!state.choices.length">
            読込中
        </div>
        <test-card
        v-else
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, useContext, useAsync, useRoute, reactive, inject } from '@nuxtjs/composition-api'

import { Choice } from "../types/Choice"

import { ChoiceState } from '../composables/state/choiceState'
import ChoiceKey from '../composables/key/choiceKey'
import UnitChip from '../components/UnitChip.vue'
import TestCard from '../components/TestCard.vue'

export default defineComponent({
  components: { UnitChip, TestCard },
    layout: 'test',
    
    setup () {
        const { $axios } = useContext()
        const route = useRoute()
        const { state } = inject(ChoiceKey) as ChoiceState
        const { setChioces } = inject(ChoiceKey) as ChoiceState
        useAsync(() => {
            $axios.$get('/api/choice', {
                params: {
                    subject: route.value.query.subject,
                    unit: route.value.query.unit,
                }
            }).then((res) => {
                setChioces(res)
            })
        })
        // const data = reactive({
        //     index: 0
        // })
        // const countup = () => {
        //     data.index++
        // }
        return {
            state,
            // choices,
            // data,
            // countup,
        }
    }
})
</script>

<style scoped>

</style>