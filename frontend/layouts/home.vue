<template>
    <v-app>
        <app-bar>
            <Nuxt />
        </app-bar>
        <bottom-nav />
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BottomNav from '../components/BottomNav.vue'
import AppBar from '../components/AppBar.vue'

export default defineComponent({
  components: { AppBar, BottomNav },
    setup () {
        return {}
    }
})
</script>

<style scoped>

</style>