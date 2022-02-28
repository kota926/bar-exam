<template>
    <div>
        <tab-bar>
            <unit-list />
        </tab-bar>
        <bottom-nav />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import BottomNav from '../components/BottomNav.vue'
import TabBar from '../components/TabBar.vue'
import UnitList from '../components/UnitList.vue'

export default defineComponent({
    components: {UnitList, TabBar, BottomNav },
    layout: 'default',
    setup () {
        return {}
    }
})
</script>

<style scoped>

</style>