<template>
    <v-app>
        <app-bar>
            <Nuxt />
        </app-bar>
        <bottom-nav />
    </v-app>
</template>

<script lang="ts">
import { defineComponent, provide } from '@nuxtjs/composition-api'
import BottomNav from '../components/BottomNav.vue'
import AppBar from '../components/AppBar.vue'
import authState from '../composables/state/authState'
import AuthKey from '../composables/key/authKey'

export default defineComponent({
    components: { AppBar, BottomNav },
    setup () {
        provide(AuthKey, authState())
        return {}
    }
})
</script>

<style scoped>

</style>