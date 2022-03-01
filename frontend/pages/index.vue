<template>
    <div>
        <app-bar>
            <v-container
            class="container"
            >
                <profile-card />
                <last-question-card />
                <pwa-card />
            </v-container>
        </app-bar>
        <bottom-nav />
    </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import AppBar from '../components/AppBar.vue'
import BottomNav from '../components/BottomNav.vue'
import LastQuestionCard from '../components/LastQuestionCard.vue'
import ProfileCard from '../components/ProfileCard.vue'
import PwaCard from '../components/PwaCard.vue'

export default defineComponent({
    components: { ProfileCard, AppBar, BottomNav, LastQuestionCard, PwaCard },
    layout: 'default',
    middleware: 'auth',
    setup() {
        return {
        }
    }
})
</script>

<style scoped>
.container {
  max-width: 700px;
}
</style>