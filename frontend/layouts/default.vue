<template>
  <v-app>
      <Nuxt />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, reactive, provide } from '@nuxtjs/composition-api'
import authState from '../composables/state/authState'
import AuthKey from '../composables/key/authKey'
import choiceState from '../composables/state/choiceState'
import ChoiceKey from '../composables/key/choiceKey'
import userState from '../composables/state/userState'
import UserKey from '../composables/key/userKey'

export default defineComponent({
    name: 'DefaultLayout',
    setup(props, context) {
        provide(ChoiceKey, choiceState())
        provide(AuthKey, authState())
        provide(UserKey, userState())
        
        const data = reactive({
            loading: false,
        })
        return {
            data,
        }
    }
})
</script>

<style scoped>
.sheet {
    padding-top: 100px;
    background: #f0f0f0;
}
.icon {
    font-size: 1.5rem;
}
.contain {
    padding: 0;
}
</style>