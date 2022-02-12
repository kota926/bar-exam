<template>
<div>
    <div v-if="!state.isComplete">
        <v-bottom-navigation class='nav'>
            <v-btn
            @click="clickYes"
            class="mr-10"
            >
                <font-awesome-icon class="icon" :icon="['far', 'circle']"/>
            </v-btn>
            <v-btn
            @click="clickNo"
            >
                <font-awesome-icon class="icon" :icon="['fas', 'times']"/>
            </v-btn>
        </v-bottom-navigation>
        <!-- <div class="d-flex justify-center my-8">
            <v-card
            class="mr-4">
                <v-btn
                outlined
                color="primary"
                @click="clickYes"
                >
                    ○
                </v-btn>
            </v-card>
            <v-card>
                <v-btn
                outlined
                color="error"
                @click="clickNo"
                >
                    <font-awesome-icon class="icon" :icon="['fas', 'times']"/>
                </v-btn>
            </v-card>
        </div> -->
    </div>
    <div v-else>
        <v-bottom-navigation class='nav'>
            <v-btn
            outlined
            @click="finish"
            class="mr-10"
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
        const { $axios } = useContext()
        const {
            state,
            setAnswer,
            increaseIndex,
            switchHideResult,
            setOverlay,
        } = inject(GlobalKey) as GlobalState

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
                setAnswer(false)
                setTimeout(() => {
                    increaseIndex()
                    switchHideResult()
                    setOverlay(false)
                }, 1000);
            }
            const setDone = (recordId: string) => {
                $axios.$post('/api/done', {
                    subject: route.value.query.subject,
                    id: recordId,
                    unit: route.value.query.unit,
                    index: state.index + 1
                }).then((res) => {
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
            }
            if(context.root.$auth.loggedIn) {
                switch(route.value.query.subject) {
                    case 'cons':
                        console.log('cons')
                        setDone(context.root.$auth.user.constitutionId)
                    break
                    case 'gov':
                        console.log('gov')
                        setDone(context.root.$auth.user.governmentId)
                    break
                    case 'civil':
                        console.log('civil')
                        setDone(context.root.$auth.user.civilId)
                    break
                    case 'company':
                        console.log('company')
                        setDone(context.root.$auth.user.companyId)
                    break
                }
            }
            // if() {
            //     context.root.$axios.$post('/api/done-record', {
            //         subject: '憲法',
            //         id: context.root.$auth.user.constitutionId,
            //         year: context.root.$route.query.year,
            //         index: state.index + 1
            //     }).then((res) => {
            //         console.log(res)
            //     }).catch((err) => {
            //         console.log(err)
            //     })
            // }
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
            
            // if(context.root.$auth.loggedIn) {
            //     context.root.$axios.$post('/api/done-record', {
            //         subject: '憲法',
            //         id: context.root.$auth.user.constitutionId,
            //         year: context.root.$route.query.year,
            //         index: state.index + 1
            //     }).then((res) => {
            //         console.log(res)
            //     }).catch((err) => {
            //         console.log(err)
            //     })
            // }
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