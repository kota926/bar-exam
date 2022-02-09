<template>
    <v-container>
        <profile-card
        v-if="isUser"
        :user="user"
        />
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
import { defineComponent, computed } from '@nuxtjs/composition-api'
import ProfileCard from '../components/ProfileCard.vue'

export default defineComponent({
    components: { ProfileCard },
    layout: 'home',
    middleware: 'onHome',
    setup(props, context) {
        const logoutUser = () => {
            context.root.$auth.logout()
        }
        const isUser = computed(() => {
            return context.root.$auth.user !== null
        })
        const user = computed(() => {
            return context.root.$auth.user
        })
        return {
            logoutUser,
            isUser,
            user,
        }
    }
})
</script>
