<template>
<div>
    <app-bar>
        <v-container
        class="mx-auto"
        max-width="500px"
        >
            <sign-in
            v-if="data.isSignin"
            @show-signin="hideSignin"
            />
            <sign-up
            v-else-if="data.isSignup"
            @show-signin='showSignin'
            @show-success="hideSignup"
            />
            <sent-email
            v-else-if="data.isSuccess"
            />
            <fail-sent-email
            v-else
            />
        </v-container>
    </app-bar>
    <bottom-nav />
</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import SentEmail from '../components/SentEmail.vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
import FailSentEmail from '../components/FailSentEmail.vue'
import AppBar from '../components/AppBar.vue'
import BottomNav from '../components/BottomNav.vue'

export default defineComponent({
    components: { SignIn, SignUp, SentEmail, FailSentEmail, AppBar, BottomNav },
    middleware: 'onAuth',
    // auth: 'guest',
    layout: 'default', 
    setup() {
        const data = reactive({
            isSignin: true,
            isSignup: true,
            isSuccess: true,
        })
        const hideSignin = () => {
            data.isSignin = false
        }
        const showSignin = () => {
            data.isSignin = true
        }
        const hideSignup = () => {
            data.isSignup = false
        }
        const hideSuccess = () => {
            data.isSignup = false
            data.isSuccess = false
        }
        return {
            data,
            hideSignin,
            showSignin,
            hideSignup,
            hideSuccess,
        }
    }
})
</script>

<style scoped>

</style>