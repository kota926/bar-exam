<template>
    <v-app>
        <tab-bar>
            <Nuxt />
        </tab-bar>
        <bottom-nav />
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BottomNav from '../components/BottomNav.vue'
import TabBar from '../components/TabBar.vue'

export default defineComponent({
  components: { BottomNav },
    setup () {
        
        TabBar

        return {}
    }
})
</script>

<style scoped>

</style>