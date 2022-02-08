<template>
    <v-container>
        <v-card>
            <v-card-text>
                {{ $auth.user }}
            </v-card-text>
        </v-card>
        <v-card
        class="my-4"
        >
            <v-card-actions>
                <v-btn
                outlined
                color="primary"
                class="mx-auto"
                @click="logoutUser"
                >
                    ログアウト
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
   name: 'IndexPage',
    layout: 'home',
    middleware: 'auth',
    setup(props, context) {
        const logoutUser = () => {
            context.root.$auth.logout()
        }
        return {
            logoutUser,
        }
    }
})
</script>
