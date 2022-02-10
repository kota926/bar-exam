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
                    <span>{{ state.record ? state.record[unitNumber] : 10 }}</span>
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
            </div>
        </v-card>
        {{ state.record }}
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, useRouter, useRoute, inject, provide } from '@nuxtjs/composition-api'
import { ChoiceState } from '../composables/state/choiceState'
import ChoiceKey from '../composables/key/choiceKey'
import { UserState } from '../composables/state/userState'
import UserKey from '../composables/key/userKey'
 
export default defineComponent({
    props: {
        unit: {
            type: Object,
            default: {name: '単元名', num: 0}
        },
        unitNumber: {
            type: Number,
            default: 0
        },
        record: {
            type: Object,
            required: false,
        }
    },
    setup (props, context) {
        const router = useRouter()
        const route = useRoute()
        // const { state } = inject(ChoiceKey) as ChoiceState
        const { state } = inject(UserKey) as UserState
        const donePercent = computed(() => {
                    if(!state.record) return 0 + '%'
                    const percent = state.record[props.unitNumber] / props.unit.num * 100
                    return percent + '%'
                })

        const remainedPercent = computed(() => {
            if(!state.record) return 100 + '%'
            const percent = (1 - state.record[props.unitNumber] / props.unit.num) * 100
            return percent + '%'
        })

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
            state,
            donePercent,
            remainedPercent,
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