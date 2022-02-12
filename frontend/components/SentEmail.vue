<template>
    <v-card
    class="text-center my-auto"
    >
        <v-card-text>
            {{ state.email }} に認証用メールをお送りしました。
        </v-card-text>
        <font-awesome-icon class="icon changer" icon="check" />
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
    font-size: 1.8rem;
    color: #4CAF50;
}
</style>