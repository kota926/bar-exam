<template>
    <v-app>
        <tab-bar-test>
            <Nuxt />
        </tab-bar-test>
    </v-app>
</template>

<script lang="ts">
import { defineComponent, provide } from '@nuxtjs/composition-api'
import BottomNav from '../components/BottomNav.vue'
import TabBar from '../components/TabBar.vue'

import choiceState from '../composables/state/choiceState'
import ChoiceKey from '../composables/key/choiceKey'
import TabBarTest from '../components/TabBarTest.vue'

export default defineComponent({
  components: { TabBar, BottomNav, TabBarTest },
    setup () {
        provide(ChoiceKey, choiceState())

        return {}
    }
})
</script>

<style scoped>

</style>