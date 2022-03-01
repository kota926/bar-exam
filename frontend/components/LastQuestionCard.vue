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
                <font-awesome-icon class="icon mx-2" style="width: 10px" :icon="['fas', 'chevron-right']"/>
                <div>{{ unit }}</div>
                <font-awesome-icon class="icon mx-2" style="width: 10px" :icon="['fas', 'chevron-right']"/>
                <div>第{{ lastNum + 1 }}問</div>
            </div>
        </div>
        <font-awesome-icon class="bigger ml-auto mr-4" style="width: 10px" :icon="['fas', 'caret-right']"/>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, computed, inject, useContext, useRouter, onMounted, reactive } from '@nuxtjs/composition-api'
import { GlobalState } from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'
import Common from '../plugins/common'
import { User }from '../types/User'


export default defineComponent({
    setup () {
        const { $auth } = useContext()
        const router = useRouter()
        const data = reactive({
            user: {} as User
        })

        // 問題を解いてもユーザー情報が更新されないので再取得
        onMounted(() => {
            if($auth.loggedIn) {
                $auth.fetchUser().then((res) => {
                    if(res) {
                        data.user = res.data.user
                    }
                })
            }
        })

        const { state, setTotalNumber, setIndex} = inject(GlobalKey) as GlobalState
        const subject = computed(() => {
            if(typeof data.user.lastSubject === 'string') {
                return Common.searchSubject(data.user.lastSubject)
            } else {
                return '科目'
            }
        })
        const unit = computed(() => {
            if(typeof data.user.lastSubject === 'string'
                && typeof data.user.lastUnit === 'string') {
                return Common.searchUnit(data.user.lastSubject, data.user.lastUnit)
            } else {
                return '単元'
            }
        })
        const lastNum = computed(() => {
            if(data.user) {
                return data.user.lastNumber
            } else {
                return 0
            }
        })

        const goTest = () => {
            if(data.user) {
                const totalNum = Common.searchTotalNum(data.user.lastSubject, data.user.lastUnit)
                if(totalNum) setTotalNumber(totalNum)
                setIndex(data.user.lastNumber)
                router.push({path: 'test', query: {
                        subject: data.user.lastSubject,
                        unit: data.user.lastUnit
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