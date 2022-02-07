<template>
    <v-app>
        <tab-bar-test>
            <Nuxt />
        </tab-bar-test>
        <test-bottom-nav />
    </v-app>
</template>

<script lang="ts">
import { defineComponent, provide } from '@nuxtjs/composition-api'
import BottomNav from '../components/BottomNav.vue'
import TabBar from '../components/TabBar.vue'

import choiceState from '../composables/state/choiceState'
import ChoiceKey from '../composables/key/choiceKey'
import TabBarTest from '../components/TabBarTest.vue'
import TestBottomNav from '../components/TestBottomNav.vue'

export default defineComponent({
  components: { TabBar, BottomNav, TabBarTest, TestBottomNav },
    setup () {
        provide(ChoiceKey, choiceState())
        return {}
    }
})
</script>

<style scoped>
/* .nav {
    background-color: #f0f0f0;
} */
</style>