<template>
    <div>
        <result-text-card
        v-for="(choice, index) in state.choices" :key="index"
        :choice="choice"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { GlobalState } from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'
import ResultTextCard from './ResultTextCard.vue'

export default defineComponent({
  components: { ResultTextCard },
    setup () {
        const { state } = inject(GlobalKey) as GlobalState
        return {
            state
        }
    }
})
</script>

<style scoped>

</style>