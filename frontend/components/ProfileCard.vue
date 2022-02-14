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
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
    props: {
        user: {
            type: Object,
            required: false,
        }
    },
    setup (props) {
        const date = computed(() => {
            if(props.user) {
                const year = props.user.createdAt.split('-')[0]
                let month: string
                if(props.user.createdAt.split('-')[1].startsWith('0')) {
                    month = props.user.createdAt.split('-')[1].slice(1, 2)
                } else {
                    month = props.user.createdAt.split('-')[1]
                }
                let day: string
                if(props.user.createdAt.split('-')[2].startsWith('0')) {
                    day = props.user.createdAt.split('-')[2].slice(1, 2)
                } else {
                    day = props.user.createdAt.split('-')[2].slice(0, 2)
                }
                return year + '年' + month + '月' + day + '日'
            } else {
                const date = new Date()
                return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
            }
        })

        return {
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