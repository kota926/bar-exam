<template>
    <v-card>
        <div class="ml-4 pt-4 mb-2 text-h5">
            {{ data.user ? data.user.name : 'name' }}
        </div>
        <div class="date d-flex align-center pb-3">
            <font-awesome-icon class="icon ml-4 mr-2" size="xs" style="width: 16px" :icon="['far', 'clock']" />
            <!-- <font-awesome-icon class="icon ml-4 mr-2" size="xs" icon="fa-regular fa-clock" /> -->
            <div>{{ date }}に開始</div>
        </div>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, computed, useContext, reactive, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
    setup () {
        const { $auth } = useContext()
        const data = reactive({
            user: null
        })

        // 問題を解いてもユーザー情報が更新されないので再取得
        onMounted(() => {
            if($auth.loggedIn) {
                data.user = $auth.user
            }
        })
        const date = computed(() => {
            if(data.user) {
                const year = data.user.createdAt.split('-')[0]
                let month: string
                if(data.user.createdAt.split('-')[1].startsWith('0')) {
                    month = data.user.createdAt.split('-')[1].slice(1, 2)
                } else {
                    month = data.user.createdAt.split('-')[1]
                }
                let day: string
                if(data.user.createdAt.split('-')[2].startsWith('0')) {
                    day = data.user.createdAt.split('-')[2].slice(1, 2)
                } else {
                    day = data.user.createdAt.split('-')[2].slice(0, 2)
                }
                return year + '年' + month + '月' + day + '日'
            } else {
                const date = new Date()
                return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
            }
        })

        return {
            data,
            date
        }
    }
})
</script>

<style scoped>
.date {
    color: silver;
}
</style>