<template>
    <div>
        <app-bar>
            <v-container
            class="container"
            >
            <profile-card
            :user="user"
            />
            <last-question-card />
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
        </app-bar>
        <bottom-nav />
    </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import AppBar from '../components/AppBar.vue'
import BottomNav from '../components/BottomNav.vue'
import LastQuestionCard from '../components/LastQuestionCard.vue'
import ProfileCard from '../components/ProfileCard.vue'

export default defineComponent({
    components: { ProfileCard, AppBar, BottomNav, LastQuestionCard },
    layout: 'default',
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

<style scoped>
.container {
  max-width: 700px;
}
</style>