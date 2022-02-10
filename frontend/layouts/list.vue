<template>
    <v-app>
        <tab-bar>
            <Nuxt />
        </tab-bar>
        <bottom-nav />
    </v-app>
</template>

<script lang="ts">
import { defineComponent, provide } from '@nuxtjs/composition-api'
import BottomNav from '../components/BottomNav.vue'
import TabBar from '../components/TabBar.vue'

import choiceState from '../composables/state/choiceState'
import ChoiceKey from '../composables/key/choiceKey'

import userState from '../composables/state/userState'
import UserKey from '../composables/key/userKey'

export default defineComponent({
  components: { TabBar, BottomNav },
    setup () {
        provide(ChoiceKey, choiceState())
        provide(UserKey, userState())
        return {}
    }
})
</script>

<style scoped>

</style>