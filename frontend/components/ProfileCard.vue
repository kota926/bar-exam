<template>
    <v-card>
        <div class="ml-4 pt-4 mb-2 text-h5">
            {{ user ? user.name : 'name' }}
        </div>
        <div class="date d-flex align-center pb-3">
            <font-awesome-icon class="icon ml-4 mr-2" :icon="['far', 'clock']" />
            <div>{{ date }}に開始</div>
        </div>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, computed, useContext } from '@nuxtjs/composition-api'
import { User } from '../types/User'

export default defineComponent({
    setup (props) {
        const { $auth } = useContext()
        const user = computed((): User | null | undefined => {
            if($auth.loggedIn) {
                return $auth.user
            } else {
                null
            }
        })
        const date = computed(() => {
            if($auth.loggedIn) {
                const year = $auth.user.createdAt.split('-')[0]
                let month: string
                if($auth.user.createdAt.split('-')[1].startsWith('0')) {
                    month = $auth.user.createdAt.split('-')[1].slice(1, 2)
                } else {
                    month = $auth.user.createdAt.split('-')[1]
                }
                let day: string
                if($auth.user.createdAt.split('-')[2].startsWith('0')) {
                    day = $auth.user.createdAt.split('-')[2].slice(1, 2)
                } else {
                    day = $auth.user.createdAt.split('-')[2].slice(0, 2)
                }
                return year + '年' + month + '月' + day + '日'
            } else {
                const date = new Date()
                return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
            }
        })

        return {
            user,
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