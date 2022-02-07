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
import { ChoiceState } from '../composables/state/choiceState'
import ChoiceKey from '../composables/key/choiceKey'
import ResultTextCard from './ResultTextCard.vue'

export default defineComponent({
  components: { ResultTextCard },
    setup () {
        const { state } = inject(ChoiceKey) as ChoiceState
        return {
            state
        }
    }
})
</script>

<style scoped>

</style>