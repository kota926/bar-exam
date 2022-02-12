<template>
    <div>
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
        <v-overlay
        :value="state.isOverlay"
        class="text-h2"
        >
            <v-sheet
            color="rgba(0, 0, 0, 0)"
            v-if="state.isCorrect">
            <p
            class="large"
            >正解</p>
            </v-sheet>
            <v-sheet
            color="rgba(0, 0, 0, 0)"
            >
            <p
            class="large"
            v-if="!state.isCorrect"
            >不正解</p>
            </v-sheet>
        </v-overlay>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, useContext } from '@nuxtjs/composition-api'
import { GlobalState } from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'

export default defineComponent({
    setup(props, context) {
        const { state, setAnswer, switchHideResult, increaseIndex } = inject(GlobalKey) as GlobalState
        const data = reactive({
            overlay: false,
            correct: true,
        })
        const clickYes = () => {
            if(state.choices[state.index].answer === "1") {
                data.correct = true
                data.overlay = true
                setAnswer(true)
                setTimeout(() => {
                    increaseIndex()
                    switchHideResult()
                    data.overlay = false
                }, 1000);
            } else {
                data.correct = false
                data.overlay = true
                setAnswer(false)
                setTimeout(() => {
                    increaseIndex()
                    switchHideResult()
                    data.overlay = false
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
        const clickNo = () => {
            if(state.choices[state.index].answer === "2") {
                data.correct = true
                data.overlay = true
                setAnswer(true)
                setTimeout(() => {
                    increaseIndex()
                    switchHideResult()
                    data.overlay = false
                }, 1000);
            } else {
                data.correct = false
                data.overlay = true
                setAnswer(false)
                setTimeout(() => {
                    increaseIndex()
                    switchHideResult()
                    data.overlay = false
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
        return {
            state,
            clickYes,
            clickNo,
        }
    }
})
</script>

<style scoped>
.times {
    font-size: 20px;
}
</style>