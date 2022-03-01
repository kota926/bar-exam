<template>
    <div>
        <v-overlay
        :value="state.isOverlay"
        class="text-h2"
        >
            <v-sheet
            color="rgba(0, 0, 0, 0)"
            v-if="state.isCorrect">
            <p
            class="large"
            >正解</p>
            </v-sheet>
            <v-sheet
            color="rgba(0, 0, 0, 0)"
            >
            <p
            class="large"
            v-if="!state.isCorrect"
            >不正解</p>
            </v-sheet>
        </v-overlay>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { GlobalState } from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'

export default defineComponent({
    setup() {
        const { state } = inject(GlobalKey) as GlobalState
        
        return {
            state,
        }
    }
})
</script>

<style scoped>
.times {
    font-size: 20px;
}
</style>