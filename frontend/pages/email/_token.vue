<template>
    <simple-bar>
        <div class="wrapper d-flex justify-center">
            <email-loading
            v-if="data.isLoading"
            />
            <email-success
            v-else-if="data.isSuccess"
            />
            <email-fail
            v-else
            />
        </div>
    </simple-bar>
</template>

<script lang="ts">
import { defineComponent, SetupContext, onMounted, inject, reactive, useContext, useRoute } from '@nuxtjs/composition-api'
import EmailFail from '../../components/EmailFail.vue'
import EmailLoading from '../../components/EmailLoading.vue'
import EmailSuccess from '../../components/EmailSuccess.vue'
import SimpleBar from '../../components/SimpleBar.vue'
import { GlobalState } from '../../composables/state/globalState'
import GlobalKey from '../../composables/key/globalKey'

export default defineComponent({
  components: { SimpleBar, EmailLoading, EmailSuccess, EmailFail },
    layout: 'default', 
    setup(props, context: SetupContext) {
        const { $axios } = useContext()
        const route = useRoute()
        const { setIsLoading } = inject(GlobalKey) as GlobalState

        const data = reactive({
            isLoading: true,
            isSuccess: true,
        })
        const verifyEmail = () => {
            // /email/以下に認証用トークン
            const token = {
                token: route.value.params.token
            }
            // プログレスバーon
            setIsLoading(true)
            $axios.$post('auth/email', token).then((res) => {
                if(res.message === 'Email verification successed') {
                    setIsLoading(false)
                    // 成功画面表示
                    data.isLoading = false
                    // 3秒は適当
                    setTimeout(() => {
                        context.root.$router.push('/auth')
                    }, 3000);   
                } else {
                    setIsLoading(false)
                    // 失敗画面表示
                    data.isLoading = false
                    data.isSuccess = false
                    setIsLoading(false)
                    console.log('verification failed')
                    setTimeout(() => {
                        context.root.$router.push('/auth')
                    }, 3000);
                }
            }).catch((err) => {
                setIsLoading(false)
                data.isLoading = false
                data.isSuccess = false
                console.log('verification failed')
                console.log(err)
                setTimeout(() => {
                    context.root.$router.push('/auth')
                }, 3000);
            })
        }
        onMounted(verifyEmail)
        return {
            data,
            route,
        }
    }
})
</script>

<style scoped>
.wrapper {
    height: 90%;
}
</style>