<template>
    <v-chip
        class="text-caption text-sm-body-1 ml-3 mb-3"
        color="primary"
    >{{ changedUnit }}
    </v-chip>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
    name: "Unit",
    setup(props, context) {
        const route = useRoute()
        const changedUnit = computed(() => {
            switch(route.value.query.subject) {
                case '憲法':
                    switch(route.value.query.unit) {
                        case "1":
                            return "憲法と立憲主義"
                        break
                        case "2":
                            return "国民主権の原理"
                        break
                        case "3":
                            return "平和主義の原理"
                        break
                        case "4":
                            return "基本的人権の原則"
                        break
                        case "5":
                            return "基本的人権の限界"
                        break
                        case "6":
                            return "幸福追求権"
                        break
                        case "7":
                            return "法の下の平等"
                        break
                        case "8":
                            return "思想及び良心の自由"
                        break
                        case "9":
                            return "信教の自由"
                        break
                        case "10":
                            return "学問の自由"
                        break
                        case "11":
                            return "表現の自由"
                        break
                        case "12":
                            return "経済的自由権"
                        break
                        case "13":
                            return "人身の自由"
                        break
                        case "14":
                            return "社会権"
                        break
                        case "15":
                            return "国務請求権"
                        break
                        case "16":
                            return "参政権"
                        break
                        case "17":
                            return "国民の義務"
                        break
                        case "18":
                            return "権力分立の原則"
                        break
                        case "19":
                            return "国会"
                        break
                        case "20":
                            return "内閣"
                        break
                        case "21":
                            return "裁判所"
                        break
                        case "22":
                            return "財政"
                        break
                        case "23":
                            return "地方自治"
                        break
                        case "24":
                            return "憲法の保障"
                        break
                        default:
                            return "単元"
                        break      
                    }
                break
                case '行政法':
                    switch(route.value.query.unit) {
                        case "1":
                            return "行政法の基本原理"
                        break
                        case "2":
                            return "行政上の法律関係"
                        break
                        case "3":
                            return "行政組織法"
                        break
                        case "4":
                            return "行政基準"
                        break
                        case "5":
                            return "行政行為"
                        break
                        case "6":
                            return "行政裁量"
                        break
                        case "7":
                            return "行政契約"
                        break
                        case "8":
                            return "行政指導"
                        break
                        case "9":
                            return "行政計画"
                        break
                        case "10":
                            return "行政調査"
                        break
                        case "11":
                            return "行政上の義務履行確保"
                        break
                        case "12":
                            return "行政手続"
                        break
                        case "13":
                            return "情報公開・個人情報保護"
                        break
                        case "14":
                            return "行政不服審査"
                        break
                        case "15":
                            return "行政事件訴訟法概観"
                        break
                        case "16":
                            return "訴訟要件"
                        break
                        case "17":
                            return "審理・判決・教示"
                        break
                        case "18":
                            return "取消訴訟以外の抗告訴訟"
                        break
                        case "19":
                            return "仮の救済"
                        break
                        case "20":
                            return "当事者訴訟・争点訴訟"
                        break
                        case "21":
                            return "国家賠償"
                        break
                        case "22":
                            return "損失補償"
                        break
                        default:
                            return "単元"
                        break      
                    }
                break
                case '民法':
                    switch(route.value.query.unit) {
                        case "1":
                            return "民法の基本原理"
                        break
                        case "2":
                            return "私権の主体"
                        break
                        case "3":
                            return "私権の変動"
                        break
                        case "4":
                            return "無効と取消"
                        break
                        case "5":
                            return "代理"
                        break
                        case "6":
                            return "契約の効力発生時期"
                        break
                        case "7":
                            return "時効"
                        break
                        case "8":
                            return "物権の一般的効力"
                        break
                        case "9":
                            return "物権変動"
                        break
                        case "10":
                            return "占有権"
                        break
                        case "11":
                            return "所有権"
                        break
                        case "12":
                            return "用益物権"
                        break
                        case "13":
                            return "物的担保概観"
                        break
                        case "14":
                            return "抵当権"
                        break
                        case "15":
                            return "質権"
                        break
                        case "16":
                            return "留置権"
                        break
                        case "17":
                            return "先取特権"
                        break
                        case "18":
                            return "非典型担保"
                        break
                        case "19":
                            return "債権の目的"
                        break
                        case "20":
                            return "債権の効力"
                        break
                        case "21":
                            return "債権債務の移転"
                        break
                        case "22":
                            return "債権の消滅"
                        break
                        case "23":
                            return "責任財産の保全"
                        break
                        case "24":
                            return "多数当事者の債権関係"
                        break
                        case "25":
                            return "契約総論"
                        break
                        case "26":
                            return "贈与"
                        break
                        case "27":
                            return "売買"
                        break
                        case "28":
                            return "消費貸借"
                        break
                        case "29":
                            return "使用貸借"
                        break
                        case "30":
                            return "賃貸借"
                        break
                        case "31":
                            return "雇用"
                        break
                        case "32":
                            return "請負"
                        break
                        case "33":
                            return "委任"
                        break
                        case "34":
                            return "寄託・組合・和解"
                        break
                        case "35":
                            return "事務管理"
                        break
                        case "36":
                            return "不当利得"
                        break
                        case "37":
                            return "不法行為"
                        break
                        case "38":
                            return "親族法総則"
                        break
                        case "39":
                            return "婚姻"
                        break
                        case "40":
                            return "親子"
                        break
                        case "41":
                            return "親権"
                        break
                        case "42":
                            return "後見・補佐・補助"
                        break
                        case "43":
                            return "扶養"
                        break
                        case "44":
                            return "相続法総則"
                        break
                        case "45":
                            return "相続人"
                        break
                        case "46":
                            return "相続の効力"
                        break
                        case "47":
                            return "相続の承認・放棄"
                        break
                        case "48":
                            return "財産分離・相続人不存在"
                        break
                        case "49":
                            return "遺言"
                        break
                        case "50":
                            return "配偶者居住権"
                        break
                        case "51":
                            return "遺留分"
                        break
                        default:
                            return "単元"
                        break      
                    }
                break
                default:
                    return "教科"
                break
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