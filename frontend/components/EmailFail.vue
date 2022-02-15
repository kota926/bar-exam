<template>
    <v-card
    class="text-center my-auto width mx-auto"
    >
        <font-awesome-icon class="icon" :icon="['fas', 'exclamation-triangle']"/>
        <v-card-text>
            認証メールの送信に失敗しました。
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
    setup () {
        

        return {}
    }
})
</script>

<style scoped>
.icon {
    margin-bottom: 5px;
    margin-top: 10px;
    font-size: 1.8rem;
    color: #B71C1C;
}
.width {
    max-width: 500px;
}
</style>