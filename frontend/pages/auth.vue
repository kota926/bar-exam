<template>
    <v-container
    class="mx-auto"
    max-width="500px"
    >
        <sign-in
        v-if="data.showSignin"
        @show-signin="hideSignin"
        />
        <sign-up
        v-else-if="data.showSignup"
        @show-signin='showSignin'
        @show-success="hideSignup"
        />
        <sent-email
        v-else-if="data.showSuccess"
        />
        <fail-sent-email
        v-else
        />
    </v-container>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import SentEmail from '../components/SentEmail.vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
import FailSentEmail from '../components/FailSentEmail.vue'

export default defineComponent({
  components: { SignIn, SignUp, SentEmail, FailSentEmail },
    middleware: 'onAuth',
    // auth: 'guest',
    layout: 'home', 
    setup() {
        const data = reactive({
            showSignin: true,
            showSignup: true,
            showSuccess: true,
        })
        const hideSignin = () => {
            data.showSignin = false
        }
        const showSignin = () => {
            data.showSignin = true
        }
        const hideSignup = () => {
            data.showSignup = false
        }
        const hideSuccess = () => {
            data.showSignup = false
            data.showSuccess = false
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