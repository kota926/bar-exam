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
import UnitChip from '../components/UnitChip.vue'
import TabBar from '../components/TabBar.vue'
import BottomNav from '../components/BottomNav.vue'

export default defineComponent({
  components: { HiddenText, UnitChip, TabBar, BottomNav },
    layout: 'default',
    setup () {
        const { $axios } = useContext()
        const route = useRoute()
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