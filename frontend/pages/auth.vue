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
            @show-success="showSuccess"
            @show-fail="hideSuccess"
            @show-overlap-user="showOverlapUser"
            />
            <sent-email
            v-else-if="data.isSuccess"
            />
            <fail-sent-email
            v-else-if="data.isFail"
            @show-signup="showSignup"
            />
            <overlap-user
            @show-signup="showSignup"
            v-else
            />
        </v-container>
    </app-bar>
    <bottom-nav />
</div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, reactive } from '@nuxtjs/composition-api'
import SentEmail from '../components/SentEmail.vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
import FailSentEmail from '../components/FailSentEmail.vue'
import AppBar from '../components/AppBar.vue'
import BottomNav from '../components/BottomNav.vue'
import { GlobalState } from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'
import OverlapUser from '~/components/OverlapUser.vue'

export default defineComponent({
    components: { SignIn, SignUp, SentEmail, FailSentEmail, AppBar, BottomNav, OverlapUser },
    // middleware: 'onAuth',
    // auth: 'guest',
    layout: 'default', 
    setup() {
        const {setIsLoading} = inject(GlobalKey) as GlobalState
        onMounted(() =>{
            setIsLoading(false)
        })
        const data = reactive({
            isSignin: true,
            isSignup: true,
            isSuccess: true,
            isFail: true,
        })
        const hideSignin = () => {
            data.isSignin = false
        }
        const showSignin = () => {
            data.isSignin = true
        }
        const showSuccess = () => {
            data.isSignup = false
        }
        const hideSuccess = () => {
            data.isSignup = false
            data.isSuccess = false
        }
        const showSignup = () => {
            data.isSignup = true
        }
        const showOverlapUser = () => {
            data.isSignup = false
            data.isSuccess = false
            data.isFail = false
        }
        return {
            data,
            hideSignin,
            showSignin,
            showSuccess,
            hideSuccess,
            showSignup,
            showOverlapUser,
        }
    }
})
</script>

<style scoped>

</style>