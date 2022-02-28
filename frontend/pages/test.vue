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
import {
    defineComponent,
    computed,
    useContext,
    useAsync,
    useRoute,
    inject,
    onMounted,
    useRouter
} from '@nuxtjs/composition-api'

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
        const router = useRouter()
        const { state, setChioces, setComplete, setIsLoading} = inject(GlobalKey) as GlobalState
        useAsync(() => {
            setIsLoading(true)
            $axios.$get('/api/choice', {
                params: {
                    subject: route.value.query.subject,
                    unit: route.value.query.unit,
                }
            }).then((res) => {
                setIsLoading(false)
                setChioces(res)
            }).catch((err) => {
                console.log(err)
                setIsLoading(false)
                router.push('/')
            })
        })
        onMounted(() => {
            setComplete(false)
        })
        const unitNumber = computed(() => {
            return route.value.query.unit
        })
        return {
            state,
            unitNumber,
        }
    }
})
</script>

<style scoped>

</style>