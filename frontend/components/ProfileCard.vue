<template>
    <v-card>
        <div>
            {{ user.name }}
        </div>
        <div>
            <font-awesome-icon class="icon" :icon="['far', 'clock']" />
            <div>{{ user.createdAt }}</div>
        </div>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
    props: {
        user: {
            type: Object,
            required: true,
        }
    },
    setup () {
        

        return {}
    }
})
</script>

<style scoped>

</style>