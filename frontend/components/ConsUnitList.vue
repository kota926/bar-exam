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
            '憲法と立憲主義',
            '国民主権の原理',
            '平和主義の原理',
            '基本的人権の原則',
            '基本的人権の限界',
            '幸福追求権',
            '法の下の平等',
            '思想・良心の自由',
            '信教の自由',
            '学問の自由',
            '表現の自由',
            '経済的自由',
            '人身の自由',
            '社会権',
            '国務請求権',
            '参政権',
            '国民の義務',
            '権力分立の原則',
            '国会',
            '内閣',
            '裁判所',
            '財政',
            '地方自治',
            '憲法の保障',
        ]
        return {
            units,
        }
    }
})
</script>

<style scoped>

</style>