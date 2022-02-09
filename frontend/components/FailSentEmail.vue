<template>
    <v-card
    class="text-center my-auto"
    >
        <v-card-text>
            認証メールの送信に失敗しました。
        </v-card-text>
        <!-- <font-awesome-icon class="icon changer" icon="check" /> -->
        <font-awesome-icon class="icon changer" :icon="['fas', 'check']"/>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
    setup() {
        return {}
    }
})
</script>

<style scoped>
.changer {
    margin-bottom: 5px;
    font-size: 1.8rem;
    color: #4CAF50;
}
</style>