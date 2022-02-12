<template>
    <v-card
    @click="goTest"
    class="my-4 d-flex align-center"
    >
        <div>
            <v-card-title>
                続きから
            </v-card-title>
            <div
            class="d-flex flex-wrap align-center ml-4 pb-6"
            >
                <div>{{ subject }}</div>
                <font-awesome-icon class="icon mx-2" :icon="['fas', 'chevron-right']"/>
                <div>{{ unit }}</div>
                <font-awesome-icon class="icon mx-2" :icon="['fas', 'chevron-right']"/>
                <div>第{{ lastNum + 1 }}問</div>
            </div>
        </div>
        <font-awesome-icon class="bigger ml-auto mr-4" :icon="['fas', 'caret-right']"/>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, computed, inject, useRouter } from '@nuxtjs/composition-api'
import { GlobalState } from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'
import Common from '../plugins/common'


export default defineComponent({
    setup (props, context) {
        const router = useRouter()
        const { state, setTotalNumber, setIndex} = inject(GlobalKey) as GlobalState
        const subject = computed(() => {
            if(context.root.$auth.user && typeof context.root.$auth.user.lastSubject === 'string') {
                return Common.searchSubject(context.root.$auth.user.lastSubject)
            }
        })
        const unit = computed(() => {
            if(context.root.$auth.user
                && typeof context.root.$auth.user.lastSubject === 'string'
                && typeof context.root.$auth.user.lastUnit === 'string') {
                return Common.searchUnit(context.root.$auth.user.lastSubject, context.root.$auth.user.lastUnit)
            }
        })
        const lastNum = computed(() => {
            if(context.root.$auth.user) {
                return context.root.$auth.user.lastNumber
            }
        })

        const goTest = () => {
            const totalNum = Common.searchTotalNum(context.root.$auth.user.lastSubject, context.root.$auth.user.lastUnit)
            console.log(totalNum)
            setTotalNumber(totalNum)
            console.log(context.root.$auth.user)
            setIndex(context.root.$auth.user.lastNumber)
            router.push({path: 'test', query: {
                    subject: context.root.$auth.user.lastSubject,
                    unit: context.root.$auth.user.lastUnit
                }
            })
        }
        return {
            subject,
            unit,
            lastNum,
            goTest,
        }
    }
})
</script>

<style scoped>
.bigger {
    font-size: 20px;
}
</style>