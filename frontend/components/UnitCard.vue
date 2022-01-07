<template>
    <div>
        <v-card class="pb-4 mb-4">
            <div class="d-flex align-center justify-space-between">
                <v-card-title>
                    <v-chip
                    outlined
                    class="mr-1"
                    >{{ unit }}
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
                    <span>10</span>
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
import { defineComponent, computed, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
    props: {
        unit: {
            type: String,
            default: '単元名'
        }
    },
    setup (props, context) {
        const router = useRouter()
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
            router.push({path: 'question'})
        }
        const goTest = () => {
            router.push({path: 'test'})
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