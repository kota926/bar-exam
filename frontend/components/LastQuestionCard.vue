<template>
    <v-card
    @click="goTest"
    class="my-4 d-flex align-center"
    >
        <div>
            <v-card-title class="ml-sm-4 mt-sm-2">
                続きから
            </v-card-title>
            <div
            class="d-flex flex-wrap align-center ml-4 ml-sm-8 pb-6 mt-6"
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
import { defineComponent, computed, ref, inject, useContext, useRouter, useFetch, onMounted } from '@nuxtjs/composition-api'
import { GlobalState } from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'
import Common from '../plugins/common'
import { User }from '../types/User'


export default defineComponent({
    setup (props, context) {
        const router = useRouter()
        const user = ref(context.root.$auth.user as User)
        onMounted(() => {
            context.root.$auth.fetchUser().then((res) => {
                console.log(res)
                user.value = res.data.user
            })
        })

        const { state, setTotalNumber, setIndex} = inject(GlobalKey) as GlobalState
        const subject = computed(() => {
            if(typeof user.value.lastSubject === 'string') {
                console.log(Common.searchSubject(user.value.lastSubject))
                return Common.searchSubject(user.value.lastSubject)
            }
        })
        const unit = computed(() => {
            if(user
                && typeof user.value.lastSubject === 'string'
                && typeof user.value.lastUnit === 'string') {
                console.log(Common.searchUnit(user.value.lastSubject, user.value.lastUnit))
                return Common.searchUnit(user.value.lastSubject, user.value.lastUnit)
            }
        })
        const lastNum = computed(() => {
            if(user) {
                console.log(user.value.lastNumber)
                return user.value.lastNumber
            }
        })

        const goTest = () => {
            if(user) {
                const totalNum = Common.searchTotalNum(user.value.lastSubject, user.value.lastUnit)
                console.log(totalNum)
                setTotalNumber(totalNum)
                console.log(user)
                setIndex(user.value.lastNumber)
                router.push({path: 'test', query: {
                        subject: user.value.lastSubject,
                        unit: user.value.lastUnit
                    }
                })
            }
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