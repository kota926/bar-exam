<template>
    <div>
        <v-card class="pb-4 mb-4 width mx-auto">
            <div class="d-flex align-center justify-space-between">
                <v-card-title>
                    <v-chip
                    outlined
                    class="mr-1"
                    >{{ unit.name }}
                    </v-chip>
                </v-card-title>
                <div class="d-flex">
                    <v-btn
                    label
                    outlined
                    color="success"
                    class="mr-2 px-2"
                    :disabled="isDisable"
                    @click="goQuestionList"
                    >リスト
                    </v-btn>                     
                    <v-btn
                    label
                    outlined
                    color="primary"
                    class="mr-2 px-2"
                    :disabled="isDisable"
                    @click="goTest"
                    >テスト
                    </v-btn>   
                </div>
            </div>
            <!-- <div>
                <v-sheet
                class="mx-auto text-caption"
                width="90%"
                elevation="0"
                >
                    <span>回答数</span>
                    <span>{{ state.record ? state.record[unitNumber] : 5 }}</span>
                    <span>/</span>
                    <span>問題数</span>
                    <span>{{ unit.num }}</span>
                </v-sheet>
                <v-sheet
                class="d-flex mx-auto"
                height="8"
                width="90%">
                    <v-sheet
                    :width="donePercent"
                    class="done"
                    ></v-sheet>
                    <v-sheet
                    :width="remainedPercent"
                    class="do"
                    ></v-sheet>
                </v-sheet>
            </div> -->
            <percent-bar
            :doneNum="doneNum"
            :totalNum="unit.num"
            />
        </v-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, useRouter, useRoute, inject, provide } from '@nuxtjs/composition-api'
import { GlobalState } from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'
import PercentBar from './PercentBar.vue'
import Common from '../plugins/common'
 
export default defineComponent({
  components: { PercentBar },
    props: {
        unit: {
            type: Object,
            default: {name: '単元名', num: 0}
        },
        unitNumber: {
            type: Number,
            default: 0
        },
    },
    setup (props, context) {
        const router = useRouter()
        const route = useRoute()
        const { state, setIndex, setTotalNumber } = inject(GlobalKey) as GlobalState

        const unitName = computed(() => {
            if(route.value.query.subject === 'string') {
                return Common.searchUnit(route.value.query.subject , String(props.unitNumber))
            }
        })

        const isDisable = computed(() => {
            return props.unit.num === 0
        })

        const doneNum = computed(() => {
            if(state.record) {
                return state.record[props.unitNumber]
            } else {
                return 0
            }
        })

        const goQuestionList = () => {
            router.push({path: 'question', query: {
                subject: route.value.query.subject,
                unit: String(props.unitNumber)
            }})
        }
        const goTest = () => {
            console.log(props.unit.num)
            setTotalNumber(props.unit.num)
            if(state.record) {
                if(state.record[props.unitNumber] === props.unit.num) {
                    setIndex(0)
                    router.push({path: 'test', query: {
                        subject: route.value.query.subject,
                        unit: String(props.unitNumber)
                    }})
                } else {
                    setIndex(state.record[props.unitNumber])
                    router.push({path: 'test', query: {
                        subject: route.value.query.subject,
                        unit: String(props.unitNumber)
                    }})
                }
            } else {
                setIndex(0)
                router.push({path: 'test', query: {
                    subject: route.value.query.subject,
                    unit: String(props.unitNumber)
                }})
            }
        }
        return {
            goQuestionList,
            goTest,
            state,
            isDisable,
            doneNum,
        }
    }
})
</script>

<style scoped>
.container {
    background: #F2F2F2;
    margin: 0;
}
.icon {
    margin: 0 1.2rem;
    font-size: 1.7rem;
    color: silver;
}
.width {
    max-width: 700px;
}
</style>