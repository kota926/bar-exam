<template>
  <v-app>
      <Nuxt />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, reactive, provide } from '@nuxtjs/composition-api'
import globalState from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'

export default defineComponent({
    name: 'DefaultLayout',
    setup(props, context) {
        provide(GlobalKey, globalState())

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