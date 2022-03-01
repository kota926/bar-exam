<template>
    <v-chip
        class="text-caption text-sm-body-1 ml-3 mb-3"
        color="primary"
    >{{ changedUnit }}
    </v-chip>
</template>

<script lang="ts">
import { defineComponent, computed, useRoute } from '@nuxtjs/composition-api'
import Common from '../plugins/common'

export default defineComponent({
    name: "Unit",
    setup() {
        const route = useRoute()
        const changedUnit = computed(() => {
            if(typeof route.value.query.subject === 'string'
                && typeof route.value.query.unit === 'string') {
                return Common.searchUnit(route.value.query.subject, route.value.query.unit)
            }
        })
        return {
            changedUnit
        }
    } 
})
</script>

<style scoped>

</style>