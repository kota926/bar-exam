<template>
    <simple-bar>
        <div class="wrapper d-flex justify-center">
            <!-- <email-loading
            v-if="data.showLoading"/>
            <email-success
            v-else-if="data.showSuccess"
            />
            <email-fail
            v-else
            /> -->
            認証
        </div>
    </simple-bar>
</template>

<script lang="ts">
import { defineComponent, SetupContext, onMounted, reactive, useContext, useRoute } from '@nuxtjs/composition-api'
import SimpleBar from '../../components/SimpleBar.vue'
// import EmailLoading from '../../components/EmailLoading.vue'
// import EmailSuccess from '../../components/EmailSuccess.vue'
// import EmailFail from '../../components/EmailFail.vue'

export default defineComponent({
  components: { SimpleBar },
    layout: 'default', 
    setup(props, context: SetupContext) {
        const { $axios } = useContext()
        const route = useRoute()
        const data = reactive({
            showLoading: false,
            showSuccess: true,
        })
        const verifyEmail = () => {
            const token = {
                token: route.value.params.token
            }
            $axios.$post('auth/email', token).then((res) => {
                console.log('verification successed')
                console.log(res)
                if(res.message === 'Email verification successed') {
                    data.showLoading = false
                    setTimeout(() => {
                        context.root.$router.push('/auth')
                    }, 2000);   
                } else {
                    data.showSuccess = false
                    console.log('verification failed')
                    setTimeout(() => {
                        context.root.$router.push('/auth')
                    }, 2000);
                }
            }).catch((err) => {
                data.showSuccess = false
                console.log('verification failed')
                console.log(err)
                setTimeout(() => {
                    context.root.$router.push('/auth')
                }, 2000);
            })
        }
        onMounted(verifyEmail)
        return {
            data,
            route,
            // verifyEmail,
        }
    }
})
</script>

<style scoped>
.wrapper {
    height: 90%;
}
</style>