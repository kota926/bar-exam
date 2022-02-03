<template>
    <div>
        <unit-card 
        v-for="(unit, index) in units" :key="index"
        :unit="unit"
        :unitNumber="index + 1"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, useRoute } from '@nuxtjs/composition-api'
import UnitCard from './UnitCard.vue'

export default defineComponent({
    components: { UnitCard },
    setup (props, context) {
        const route = useRoute()
        const consUnits = [
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
        const govUnits = [
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
        const civilUnits = [
            '民法の基本原理',
            '私権の主体',
            '私権の変動',
            '無効と取消',
            '代理',
            '契約の効力発生時期',
            '時効',
            '物権の一般的効力',
            '物権変動',
            '占有権',
            '所有権',
            '用益物権',
            '物的担保概観',
            '抵当権',
            '質権',
            '留置権',
            '先取特権',
            '非典型担保',
            '債権の目的',
            '債権の効力',
            '債権債務の移転',
            '債権の消滅',
            '責任財産の保全',
            '多数当事者の債権関係',
            '契約総論',
            '贈与',
            '売買',
            '消費貸借',
            '使用貸借',
            '賃貸借',
            '雇用',
            '請負',
            '委任',
            '寄託・組合・和解',
            '事務管理',
            '不当利得',
            '不法行為',
            '親族法総則',
            '婚姻',
            '親子',
            '親権',
            '後見・補佐・補助',
            '扶養',
            '相続法総則',
            '相続人',
            '相続の効力',
            '相続の承認・放棄',
            '財産分離・相続人の不存在',
            '遺言',
            '配偶者居住権',
            '遺留分',
        ]
        const companyUnits = [
            '会社法総則',
            '設立',
            '株式',
            '機関',
            '計算',
            '資金調達',
            '定款変更',
            '解散・精算',
            '買収・結合・再編',
            '企業グループ',
            '持分会社・組織変更',
            '会社法上の訴訟',
            '商法総則',
            '商行為法',
            '有価証券法総則',
            '約束手形',
            '為替手形・小切手',
        ]
        const units = computed(() => {
            switch(route.value.query.subject) {
                case "cons":
                    return consUnits
                break
                case "gov":
                    return govUnits
                break
                case "civil":
                    return civilUnits
                break
                case 'company':
                    return companyUnits
                break
                default:
                    return ['単元']
            }
        })
        return {
            consUnits,
            govUnits,
            units,
        }
    }
})
</script>

<style scoped>

</style>