<template>
    <div>
        <v-card class="card-width">
            <v-card-title>
                サインアップ
            </v-card-title>
            <v-form
                ref="form"
                
                lazy-validation
            >
                <v-container>
                    <v-text-field
                    v-model="data.email"
                    outlined
                    label="E-mail"
                    required
                    :disabled="data.isDisable"
                    ></v-text-field>

                    <v-text-field
                    v-model="data.name"
                    :counter="50"
                    outlined
                    label="Name"
                    required
                    :disabled="data.isDisable"
                    ></v-text-field>

                    <v-text-field
                    v-model="data.password"
                    outlined
                    label="Password"
                    required
                    :disabled="data.isDisable"
                    ></v-text-field>
                    <v-row
                    class="d-flex justify-center"
                    >
                        <v-btn
                        color="primary"
                        outlined
                        class="mb-5"
                        @click="signUp"
                        :disabled="data.isDisable"
                        >
                            サインアップ
                        </v-btn>
                    </v-row>
                </v-container>
            </v-form>
        </v-card>
        <transition name="top">
            <v-card
            class="text-center mb-4 pa-4 card-width d-flex justify-center align-center"
            v-if="data.showMessage"
            >
                 <!-- <font-awesome-icon class="icon message" size="xl" icon="fa-solid fa-exclamation-triangle" /> -->
                <font-awesome-icon class="message" style="width: 30px" :icon="['fas', 'exclamation-triangle']"/>
                <div class="ml-2 message">
                    {{ data.message }}
                </div>
            </v-card>
        </transition>
        <v-card
        class="d-flex justify-center py-2 card-width"
        >
            <v-card-actions>
                <v-btn
                outlined
                @click="toSignIn">
                    サインインへ戻る
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, useContext, useRouter } from '@nuxtjs/composition-api'
import { GlobalState } from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'

export default defineComponent({
    name: "SignUp",
    setup(props, context) {
        const { mutateEmail, setIsLoading } = inject(GlobalKey) as GlobalState
        const { $axios, $auth } = useContext()
        const router = useRouter()
        const data = reactive({
            name: '',
            email: '',
            password: '',
            isDisable: false,
            showMessage: false,
            message: '',
        })
        const signUp = () => {
            if($auth.loggedIn) {
                router.push('/')
            } else {
                mutateEmail(data.email)
                if(data.email.trim() && data.name.trim() && data.password.trim()) {
                    const user = {
                    name: data.name.trim(),
                    email: data.email.trim(),
                    password: data.password.trim()
                    }
                    const url = 'auth/signup'
                    data.isDisable = true
                    setIsLoading(true)
                    $axios.$post(url, user).then((response) => {
                        if(response.message === 'User already exists.') {
                            context.emit('show-overlap-user')
                        } else {
                            context.emit('show-success')
                        }
                        setIsLoading(false)
                    }).catch((error) => {
                        console.log('res fail')
                        console.log(error)
                        context.emit('show-fail')
                        setIsLoading(false)
                    })
                } else if (data.password.trim() && data.name.trim()) {
                    console.log('email empty')
                    data.showMessage = true
                    data.message = 'メールを入力してください'
                } else if (data.email.trim() && data.password.trim()) {
                    console.log('name empty')
                    data.showMessage = true
                    data.message = '名前を入力してください'
                } else if (data.email.trim() && data.name.trim()) {
                    console.log('password empty')
                    data.showMessage = true
                    data.message = 'パスワードを入力してください'
                } else {
                    console.log('empty')
                    data.showMessage = true
                    data.message = 'サインアップ情報を入力してください'
                }
            }
        }
        const toSignIn = () => {
            context.emit('show-signin')
        }
        return {
            data,
            signUp,
            toSignIn,
        }
    }
})
</script>

<style scoped>
.card-width {
    max-width: 600px;
    margin: 0 auto;
}
.message {
    color: brown;
}
.top-enter-active, .top-leave-active {
  transform: translate(0px, 0px); 
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.top-enter, .top-leave-to {
  transform: translateY(-5vh) translateY(0px);
}
</style>