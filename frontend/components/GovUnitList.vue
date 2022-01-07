<template>
    <div>
        <unit-card
        v-for="(unit, index) in units" :key="index"
        :unit="unit"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UnitCard from './UnitCard.vue'

export default defineComponent({
    components: {
        UnitCard,
    },
    setup () {
        const units = [
            '行政法の基本原理',
            '行政上の法律関係',
            '行政組織法',
            '行政基準',
            '行政行為',
            '行政裁量',
            '行政契約',
            '行政指導',
            '行政計画',
            '行政調査',
            '行政上の義務履行確保',
            '行政手続',
            '個人情報保護',
            '行政不服審査',
            '行政事件訴訟法概観',
            '訴訟要件',
            '審理・判決・教示',
            '取消訴訟以外の抗告訴訟',
            '仮の救済',
            '当事者訴訟・争点訴訟',
            '国家賠償',
            '損失補償',
        ]
        return {
            units,
        }
    }
})
</script>

<style scoped>

</style>