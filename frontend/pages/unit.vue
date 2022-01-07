<template>
    <div>
        <unit-list />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import UnitList from '../components/UnitList.vue'

export default defineComponent({
    components: {UnitList },
    layout: 'list',
    setup (props, context) {
        // const router = context.root.$router
        
        return {}
    }
})
</script>

<style scoped>

</style>