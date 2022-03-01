<template>
    <v-card
    class="text-center my-auto width mx-auto"
    >
        <v-card-text>
            メールの認証が完了しました
        </v-card-text>
        <font-awesome-icon class="icon" size="lg" style="width: 32px" :icon="['fas', 'check']" />
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
    color: #4CAF50;
}
.width {
    max-width: 500px;
}
</style>