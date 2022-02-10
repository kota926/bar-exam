<template>
  <v-app>
      <Nuxt />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, reactive, provide } from '@nuxtjs/composition-api'
import authState from '../composables/state/authState'
import AuthKey from '../composables/key/authKey'

export default defineComponent({
    name: 'DefaultLayout',
    setup(props, context) {
        provide(AuthKey, authState())
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