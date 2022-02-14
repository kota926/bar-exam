<template>
<div>
    <v-card>
        <v-card-title>ユーザー情報</v-card-title>
    </v-card>
    <v-card
    tile
    class="pl-4 py-3 d-flex align-center justify-space-between">
        <div class="d-flex align-center">
            <font-awesome-icon class="icon" :icon="['far', 'user-circle']"/>
            <div class="ml-3 text-h5">{{ user.name }}</div>
        </div>
        <v-btn
        outlined
        color="primary"
        class="mr-3"
        @click="changeInfo('name')"
        >変更</v-btn>
    </v-card>
    <v-card
    tile
    class="pl-4 py-3 d-flex align-center justify-space-between flex-wrap">
        <div class="d-flex align-center">
            <v-icon
            
            color="teal darken-2"
            >
            mdi-email
            </v-icon>
            <div class="ml-3">{{ user.email }}</div>
        </div>
        <v-btn
        outlined
        color="primary"
        class="mr-3 ml-auto my-2"
        @click="changeInfo('email')"
        >変更</v-btn>
    </v-card>
    <v-card
    tile
    class="pl-4 py-3 d-flex align-center justify-space-between">
        <div class="d-flex align-center">
            <font-awesome-icon class="icon" :icon="['fas', 'key']"/>
            <div class="ml-3">••••••••</div>
        </div>
        <v-btn
        outlined
        color="primary"
        class="mr-3"
        @click="changeInfo('password')"
        >変更</v-btn>
    </v-card>
</div>
</template>

<script lang="ts">
import { defineComponent, useContext, computed } from '@nuxtjs/composition-api'

export default defineComponent({
    setup (props, context) {
        console.log(useContext())
        const { $auth } = useContext()

        const user = computed(() => {
            if($auth.user) {
                return $auth.user
            } else {
                return {
                    name: 'name',
                    email: 'sample@gmail.com',
                    password: 'password',
                }
            }
        })

        const changeInfo = (info: string) => {
            context.emit('change-info', info)
        }
        return {
            user,
            changeInfo
        }
    }
})
</script>

<style scoped>
.width {
    max-width: 700px;
}
.icon {
    font-size: 26px;
}
</style>