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
                    :counter="10"
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
        <transition>
            <v-card
            class="text-center mt-4 card-width d-flex justify-center align-center"
            v-if="data.showMessage"
            color="pa-4"
            >
                <font-awesome-icon class="icon message" :icon="['fas', 'exclamation-triangle']"/>
                <div class="ml-2 message">
                    {{ data.message }}
                </div>
            </v-card>
        </transition>
        <v-card
        class="d-flex justify-center my-10 card-width"
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
import { defineComponent, inject, reactive, useContext } from '@nuxtjs/composition-api'
import { AuthState } from '../composables/state/authState'
import AuthKey from '../composables/key/authKey'

export default defineComponent({
    name: "SignUp",
    setup(props, context) {
        const { mutateEmail } = inject(AuthKey) as AuthState
        const { $axios } = useContext()
        const data = reactive({
            name: '',
            email: '',
            password: '',
            isDisable: false,
            showMessage: false,
            message: '',
        })
        const signUp = () => {
            mutateEmail(data.email)
            if(data.email && data.name && data.password) {
                const user = {
                name: data.name.trim(),
                email: data.email.trim(),
                password: data.password.trim()
                }
                const url = 'auth/signup'
                console.log(user)
                data.isDisable = true
                $axios.$post(url, user).then((response) => {
                    console.log('res success')
                    console.log(response)
                    context.emit('show-success')
                }).catch((error) => {
                    console.log('res fail')
                    console.log(error)
                })
            } else if (data.password && data.name) {
                console.log('email empty')
                data.showMessage = true
                data.message = 'メールを入力してください'
            } else if (data.email && data.password) {
                console.log('name empty')
                data.showMessage = true
                data.message = '名前を入力してください'
            } else if (data.email && data.name) {
                console.log('password empty')
                data.showMessage = true
                data.message = 'パスワードを入力してください'
            } else {
                console.log('empty')
                data.showMessage = true
                data.message = 'サインアップ情報を入力してください'
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
</style>