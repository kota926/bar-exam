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
            </v-container>
        </app-bar>
        <bottom-nav />
    </div>
</template>

<script>
import { defineComponent, computed, useContext } from '@nuxtjs/composition-api'
import AppBar from '../components/AppBar.vue'
import BottomNav from '../components/BottomNav.vue'
import LastQuestionCard from '../components/LastQuestionCard.vue'
import ProfileCard from '../components/ProfileCard.vue'

export default defineComponent({
    components: { ProfileCard, AppBar, BottomNav, LastQuestionCard },
    layout: 'default',
    middleware: 'onHome',
    setup(props, context) {
        const { $auth } = useContext()
        const logoutUser = () => {
            $auth.logout()
        }
        const user = computed(() => {
            return $auth.user
        })
        return {
            logoutUser,
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