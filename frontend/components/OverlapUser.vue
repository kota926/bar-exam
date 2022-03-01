<template>
    <v-card
    class="text-center my-auto width mx-auto"
    >
        <font-awesome-icon class="icon" size="lg" style="width: 32px" :icon="['fas', 'user-times']"/>
        <v-card-text>
            同一のユーザーネームがすでに存在しています。異なるユーザーネームを入力してください。
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
    setup(props, context) {
        onMounted(() => {
            // 5秒は適当
            setTimeout(() => {
                context.emit('show-signup')
            }, 5000)
        })
        return {}
    }
})
</script>

<style scoped>
.icon {
    margin-bottom: 5px;
    margin-top: 15px;
    color: #B71C1C;
}
.width {
    max-width: 630px;
}
</style>