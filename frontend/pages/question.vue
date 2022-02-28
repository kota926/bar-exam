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
    </div>
</template>

<script lang="ts">
import { defineComponent, useContext, useAsync, useRoute, inject } from '@nuxtjs/composition-api'
import HiddenText from '../components/HiddenText.vue'

import { Choice } from "../types/Choice"

import { GlobalState } from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'
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
        const { setComplete } = inject(GlobalKey) as GlobalState
        const choices = useAsync(() => {
            return $axios.$get('/api/choice', {
                params: {
                    subject: route.value.query.subject,
                    unit: route.value.query.unit,
                }
            })
        })
        return {
            choices
        }
    }
})
</script>

<style scoped>

</style>