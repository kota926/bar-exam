<template>
    <v-card
    class="text-center my-auto width mx-auto"
    >
        <v-card-text>
            メールの認証を行っています
        </v-card-text>
        <div class="mb-5">
            <v-progress-circular
            indeterminate
            color="primary"
            ></v-progress-circular>
        </div>
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
.width {
    max-width: 500px;
}
</style>