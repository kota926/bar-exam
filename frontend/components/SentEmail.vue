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
import { AuthState } from '../composables/state/authState'
import AuthKey from '../composables/key/authKey'

export default defineComponent({
    name: 'SentEmail',
    setup() {
        const { state } = inject(AuthKey) as AuthState
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