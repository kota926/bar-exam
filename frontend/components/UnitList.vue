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
import { defineComponent, computed, ref, useRoute, useFetch, useContext, watch, inject } from '@nuxtjs/composition-api'
import UnitCard from './UnitCard.vue'
import UserKey from '../composables/key/userKey'
import { UserState } from '../composables/state/userState'

export default defineComponent({
    components: { UnitCard },
    setup (props, context) {
        const route = useRoute()
        const consUnits = [
            {name: '憲法と立憲主義', num: 8},
            {name: '国民主権の原理', num: 14},
            {name: '平和主義の原理', num: 6},
            {name: '基本的人権の原則', num: 6},
            {name: '基本的人権の限界', num: 3},
            {name: '幸福追求権', num: 0},
            {name: '法の下の平等', num: 15},
            {name: '思想・良心の自由', num: 3},
            {name: '信教の自由', num: 0},
            {name: '学問の自由', num: 6},
            {name: '表現の自由', num: 22},
            {name: '経済的自由', num: 10},
            {name: '人身の自由', num: 6},
            {name: '社会権', num: 9},
            {name: '国務請求権', num: 0},
            {name: '参政権', num: 3},
            {name: '国民の義務', num: 0},
            {name: '権力分立の原則', num: 6},
            {name: '国会', num: 12},
            {name: '内閣', num: 0},
            {name: '裁判所', num: 3},
            {name: '財政', num: 3},
            {name: '地方自治', num: 4},
            {name: '憲法の保障', num: 12},
        ]
        const govUnits = [
            {name: '行政法の基本原理', num: 3},
            {name: '行政上の法律関係', num: 3},
            {name: '行政組織法', num: 7},
            {name: '行政基準', num: 3},
            {name: '行政行為', num: 9},
            {name: '行政裁量', num: 10},
            {name: '行政契約', num: 4},
            {name: '行政指導', num: 11},
            {name: '行政計画', num: 3},
            {name: '行政調査', num: 3},
            {name: '行政上の義務履行確保', num: 8},
            {name: '行政手続', num: 15},
            {name: '個人情報保護', num: 6},
            {name: '行政不服審査', num: 12},
            {name: '行政事件訴訟法概観', num: 0},
            {name: '訴訟要件', num: 22},
            {name: '審理・判決・教示', num: 8},
            {name: '取消訴訟以外の抗告訴訟', num: 10},
            {name: '仮の救済', num: 15},
            {name: '当事者訴訟・争点訴訟', num: 3},
            {name: '国家賠償', num: 10},
            {name: '損失補償', num: 3},
        ]
        const civilUnits = [
            {name: '民法の基本原理', num: 0},
            {name: '私権の主体', num: 15},
            {name: '私権の変動', num: 10},
            {name: '無効と取消', num: 0},
            {name: '代理', num: 5},
            {name: '契約の効力発生時期', num: 5},
            {name: '時効', num: 5},
            {name: '物権の一般的効力', num: 10},
            {name: '物権変動', num: 10},
            {name: '占有権', num: 5},
            {name: '所有権', num: 10},
            {name: '用益物権', num: 5},
            {name: '物的担保概観', num: 0},
            {name: '抵当権', num: 27},
            {name: '質権', num: 1},
            {name: '留置権', num: 6},
            {name: '先取特権', num: 1},
            {name: '非典型担保', num: 5},
            {name: '債権の目的', num: 0},
            {name: '債権の効力', num: 0},
            {name: '債権債務の移転', num: 5},
            {name: '債権の消滅', num: 19},
            {name: '責任財産の保全', num: 15},
            {name: '多数当事者の債権関係', num: 20},
            {name: '契約総論', num: 5},
            {name: '贈与', num: 1},
            {name: '売買', num: 5},
            {name: '消費貸借', num: 6},
            {name: '使用貸借', num: 1},
            {name: '賃貸借', num: 10},
            {name: '雇用', num: 0},
            {name: '請負', num: 5},
            {name: '委任', num: 0},
            {name: '寄託・組合・和解', num: 12},
            {name: '事務管理', num: 5},
            {name: '不当利得', num: 0},
            {name: '不法行為', num: 10},
            {name: '親族法総則', num: 0},
            {name: '婚姻', num: 5},
            {name: '親子', num: 15},
            {name: '親権', num: 5},
            {name: '後見・補佐・補助', num: 5},
            {name: '扶養', num: 0},
            {name: '相続法総則', num: 0},
            {name: '相続人', num: 5},
            {name: '相続の効力', num: 10},
            {name: '相続の承認・放棄', num: 0},
            {name: '財産分離・相続人の不存在', num: 0},
            {name: '遺言', num: 5},
            {name: '配偶者居住権', num: 5},
            {name: '遺留分', num: 5},
        ]
        const companyUnits = [
            {name: '会社法総則', num: 0},
            {name: '設立', num: 20},
            {name: '株式', num: 30},
            {name: '機関', num: 75},
            {name: '計算', num: 20},
            {name: '資金調達', num: 16},
            {name: '定款変更', num: 0},
            {name: '解散・精算', num: 0},
            {name: '買収・結合・再編', num: 19},
            {name: '企業グループ', num: 0},
            {name: '持分会社・組織変更', num: 20},
            {name: '会社法上の訴訟', num: 20},
            {name: '商法総則', num: 20},
            {name: '商行為法', num: 20},
            {name: '有価証券法総則', num: 0},
            {name: '約束手形', num: 30},
            {name: '為替手形・小切手', num: 10},
        ]
        // const companyUnits = [
        //     '会社法総則',
        //     '設立',
        //     '株式',
        //     '機関',
        //     '計算',
        //     '資金調達',
        //     '定款変更',
        //     '解散・精算',
        //     '買収・結合・再編',
        //     '企業グループ',
        //     '持分会社・組織変更',
        //     '会社法上の訴訟',
        //     '商法総則',
        //     '商行為法',
        //     '有価証券法総則',
        //     '約束手形',
        //     '為替手形・小切手',
        // ]
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
        // const record = computed(() => {
        //     console.log(context.root.$auth.user)
        //     if(!context.root.$auth.user) {
        //         return null
        //     }
        //     switch(route.value.query.subject) {
        //         case 'cons':
        //             return context.root.$auth.user.constitution
        //         break
        //         default:
        //             return null
        //     }
        // })
        const { setRecord } = inject(UserKey) as UserState
        const currentRoute = computed(() => {
            return route.value.query.subject
        })
        const { $axios } = useContext()
        const { fetch }  = useFetch(() => {
            console.log(context.root.$auth.user)
            if(context.root.$auth.user) {
                switch(route.value.query.subject) {
                    case 'cons':
                        $axios.$get('/api/done', {
                            params: {
                                subject: route.value.query.subject,
                                id: context.root.$auth.user.constitutionId,
                            }
                        }).then((res) => {
                            setRecord(res)
                        })
                    break
                    case 'gov':
                        $axios.$get('/api/done', {
                            params: {
                                subject: route.value.query.subject,
                                id: context.root.$auth.user.governmentId,
                            }
                        }).then((res) => {
                            setRecord(res)
                        })
                }
            }
        })
        watch(currentRoute, () => {
            console.log('watch route')
            fetch()
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