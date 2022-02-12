<template>
    <div>
        <tab-bar-test >
            <unit-chip />
            <div v-if="!state.isComplete">
                <v-card class="py-2 mb-2">
                    <percent-bar
                    :doneNum="state.index"
                    :totalNum="state.totalNumber"
                    />
                </v-card>
                <div v-if="!state.choices.length">
                    読込中
                </div>
                <test-card
                v-else
                />
            </div>
            <div v-else>
                <result-card />
            </div>
        </tab-bar-test>
        <test-bottom-nav />
    </div>
</template>

<script lang="ts">
import { defineComponent, useContext, useAsync, useRoute, reactive, inject, onMounted } from '@nuxtjs/composition-api'

import { Choice } from "../types/Choice"

import { GlobalState } from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'

import UnitChip from '../components/UnitChip.vue'
import TestCard from '../components/TestCard.vue'
import ResultCard from '../components/ResultCard.vue'
import TabBarTest from '../components/TabBarTest.vue'
import TestBottomNav from '../components/TestBottomNav.vue'
import PercentBar from '../components/PercentBar.vue'

export default defineComponent({
  components: { UnitChip, TestCard, ResultCard, TabBarTest, TestBottomNav, PercentBar },
    layout: 'default',
    
    setup () {
        const { $axios } = useContext()
        const route = useRoute()
        const { state, setChioces, setComplete } = inject(GlobalKey) as GlobalState
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
        onMounted(() => {
            setComplete(false)
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