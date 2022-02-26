<template>
    <v-card
    class="text-center my-auto width mx-auto"
    >
        <!-- <font-awesome-icon class="changer" size="lg" icon="fa-solid fa-check" /> -->
        <font-awesome-icon class="changer" size="lg" style="width: 32px" :icon="['fas', 'check']" />
        <v-card-text>
            {{ state.email }} に認証用メールをお送りしました。
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { GlobalState } from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'

export default defineComponent({
    name: 'SentEmail',
    setup() {
        const { state } = inject(GlobalKey) as GlobalState
        return {
            state,
        }
    },
})
</script>

<style scoped>
.changer {
    margin-bottom: 5px;
    margin-top: 10px;
    color: #4CAF50;
}
.width {
    max-width: 600px;
}
</style>