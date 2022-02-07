<template>
    <div>
        <v-card class="pb-4 mb-4">
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
                    @click="goQuestionList"
                    >リスト
                    </v-btn>                     
                    <v-btn
                    label
                    outlined
                    color="primary"
                    class="mr-2 px-2"
                    @click="goTest"
                    >テスト
                    </v-btn>   
                </div>
            </div>
            <div>
                <v-sheet
                class="mx-auto text-caption"
                width="90%"
                elevation="0"
                >
                    <span>回答数</span>
                    <span>1</span>
                    <span>/</span>
                    <span>問題数</span>
                    <span>{{ unit.num }}</span>
                </v-sheet>
                <v-sheet
                class="d-flex mx-auto"
                height="8"
                width="90%">
                    <v-sheet
                    width="30%"
                    class="done"
                    ></v-sheet>
                    <v-sheet
                    width="70%"
                    class="do"
                    ></v-sheet>
                </v-sheet>
            </div>
        </v-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, useRouter, useRoute, inject, provide } from '@nuxtjs/composition-api'
import { ChoiceState } from '../composables/state/choiceState'
import ChoiceKey from '../composables/key/choiceKey'

export default defineComponent({
    props: {
        unit: {
            type: Object,
            default: {name: '単元名', num: 0}
        },
        unitNumber: {
            type: Number,
            default: 0
        }
    },
    setup (props, context) {
        const router = useRouter()
        const route = useRoute()
        // const { state } = inject(ChoiceKey) as ChoiceState

        // const donePercent = computed(() => {
        //             if(!props.records) return 0 + '%'
        //             const percent = props.records[props.year] / data.questionNumber * 100
        //             return percent + '%'
        //         })

        // const remainedPercent = computed(() => {
        //     if(!props.records) return 100 + '%'
        //     const percent = (1 - props.records[props.year] / data.questionNumber) * 100
        //     return percent + '%'
        // })

        const goQuestionList = () => {
            router.push({path: 'question', query: {
                subject: route.value.query.subject,
                unit: String(props.unitNumber)
            }})
        }
        const goTest = () => {
            router.push({path: 'test', query: {
                subject: route.value.query.subject,
                unit: String(props.unitNumber)
            }})
        }
        return {
            goQuestionList,
            goTest,
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
.done {
    background: royalblue;
}
.do {
    background: silver;
}
</style>