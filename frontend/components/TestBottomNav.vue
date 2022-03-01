<template>
<div>
    <div v-if="!state.isComplete">
        <v-bottom-navigation
        fixed
        grow
        height="68"
        >
            <v-btn
            @click="clickYes"
            class="pb-2"
            >
                <font-awesome-icon style="width: 28px" size="2x" :icon="['far', 'circle']"/>
            </v-btn>
            <v-btn
            @click="clickNo"
            class="pb-2"
            >
                <font-awesome-icon style="width: 28px" size="2x" :icon="['fas', 'times']"/>
            </v-btn>
        </v-bottom-navigation>
    </div>
    <div v-else>
        <v-bottom-navigation
        fixed
        height="68"
        >
            <v-btn
            outlined
            @click="finish"
            >
                FINISH
            </v-btn>
        </v-bottom-navigation>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent, inject, useContext, useRoute, useRouter } from '@nuxtjs/composition-api'
import { GlobalState } from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'

export default defineComponent({
    setup (props, context) {
        const router = useRouter()
        const route = useRoute()
        const { $axios, $auth } = useContext()
        const {
            state,
            setAnswer,
            increaseIndex,
            switchHideResult,
            setOverlay,
            setRecord,
        } = inject(GlobalKey) as GlobalState

        const setDone = (recordId: string | unknown) => {
            // 最後まで解き切ったらその単元の第1問を次に解く問題として登録
            if(!(state.choices.length === state.index +1)) {
                $axios.$put('/api/done/' + recordId, {
                    subject: route.value.query.subject,
                    unit: route.value.query.unit,
                    index: state.index + 1,
                    lastNum: state.index + 1
                }).then((res) => {
                    setRecord(res)
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                $axios.$put('/api/done/' + recordId, {
                    subject: route.value.query.subject,
                    unit: route.value.query.unit,
                    index: state.index + 1,
                    lastNum: 0
                }).then((res) => {
                    setRecord(res)
                }).catch((err) => {
                    console.log(err)
                })
            }
        }

        const clickYes = () => {
            if(state.choices[state.index].answer === "1") {
                setOverlay(true)
                setAnswer(true)
                setTimeout(() => {
                    increaseIndex()
                    switchHideResult()
                    setOverlay(false)
                }, 1000);
            } else {
                setOverlay(true)
                setAnswer(false)
                setTimeout(() => {
                    increaseIndex()
                    switchHideResult()
                    setOverlay(false)
                }, 1000);
            }
            
            if($auth.loggedIn) {
                switch(route.value.query.subject) {
                    case 'cons':
                        if($auth.user) {
                            setDone($auth.user.constitutionId)
                        }
                    break
                    case 'gov':
                        if($auth.user) {
                            setDone($auth.user.governmentId)
                        }
                    break
                    case 'civil':
                        if($auth.user) {
                            setDone($auth.user.civilId)
                        }
                    break
                    case 'company':
                        if($auth.user) {
                            setDone($auth.user.companyId)
                        }
                    break
                }
            }
        }
        const clickNo = () => {
            if(state.choices[state.index].answer === "2") {
                setOverlay(true)
                setAnswer(true)
                setTimeout(() => {
                    increaseIndex()
                    switchHideResult()
                    setOverlay(false)
                }, 1000);
            } else {
                setOverlay(true)
                setAnswer(false)
                setTimeout(() => {
                    increaseIndex()
                    switchHideResult()
                    setOverlay(false)
                }, 1000);
            }
            if($auth.loggedIn) {
                switch(route.value.query.subject) {
                    case 'cons':
                        if($auth.user) {
                            setDone($auth.user.constitutionId)
                        }
                    break
                    case 'gov':
                        if($auth.user) {
                            setDone($auth.user.governmentId)
                        }
                    break
                    case 'civil':
                        if($auth.user) {
                            setDone($auth.user.civilId)
                        }
                    break
                    case 'company':
                        if($auth.user) {
                            setDone($auth.user.companyId)
                        }
                    break
                }
            }
            
        }
        const finish = () => {
            router.push({path: 'unit', query: {
                subject: route.value.query.subject
            }})
        }
        return {
            state,
            clickYes,
            clickNo,
            finish,
        }
    }
})
</script>

<style scoped>
.icon {
    font-size: 20px;
}
</style>