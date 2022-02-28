<template>
    <div>
        <v-card class="card-width">
            <v-card-title>
                サインイン
            </v-card-title>
            <v-form
            >
                <v-container>
                    <v-text-field
                    v-model="data.name"
                    outlined
                    label="Name"
                    required
                    :disabled="data.isDisable"
                    :rules="[value => !!value || '必須']"
                    ></v-text-field>

                    <v-text-field
                    v-model="data.password"
                    outlined
                    :rules="[value => !!value || '必須']"
                    :append-icon="data.show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="data.show ? 'text' : 'password'"
                    @click:append="data.show = !data.show"
                    :disabled="data.isDisable"
                    label="Password"
                    required
                    ></v-text-field>
                    <v-row
                    class="d-flex justify-center"
                    >
                        <v-btn
                        color="primary"
                        outlined
                        class="mb-5"
                        @click="signInUser"
                        >
                            サインイン
                        </v-btn>
                    </v-row>
                </v-container>
            </v-form>
        </v-card>
        <transition name="top">
            <v-card
            class="text-center mb-2 pa-4 card-width d-flex justify-center align-center"
            v-if="data.showMessage"
            >
                <font-awesome-icon class="message" style="width: 30px" :icon="['fas', 'exclamation-triangle']" />
                <!-- <font-awesome-icon class="message" size="lg" icon="exclamation-triangle" /> -->
                <div class="ml-4 message">
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
                    初めての方はこちら
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext, inject, useRouter } from '@nuxtjs/composition-api'
import { GlobalState } from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'

export default defineComponent({
    name: "SignIn", 
    setup(props, context) {
        const { setIsLoading } = inject(GlobalKey) as GlobalState
        const { $auth } = useContext()
        const router = useRouter()
        const data = reactive({
            isDisable: false,
            show: false,
            showMessage: false,
            name: "",
            password: "",
            message: 'サインイン情報を入力してください',
        })
        const signInUser = () => {
            if($auth.loggedIn) {
                router.push('/')
            } else {
                if(data.name.trim() && data.password.trim()) {
                    setIsLoading(true)
                    data.isDisable = true
                    const user = {
                    name: data.name.trim(),
                    password: data.password.trim()
                    }
                    $auth.loginWith('local', {
                        data: user
                    }).then((res: any) => {
                        if(res.data.message === 'name not found') {
                            data.showMessage = true
                            data.message = 'ユーザーネームが正しくありません'
                            data.name = ""
                            data.password = ""
                        } else if(res.data.message === "password is not correct") {
                            data.showMessage = true
                            data.message = 'パスワードが正しくありません'
                            data.password = ""
                        } else if(!$auth.loggedIn){
                            data.showMessage = true
                            data.message = 'ユーザーネームもしくはパスワードが正しくありません'
                            data.name = ""
                            data.password = ""
                        }
                        setIsLoading(false)
                        data.isDisable = false
                    }).catch((err) => {
                        console.log(err)
                        data.showMessage = true
                        data.message = 'サーバー上でエラーが発生しました'
                        setIsLoading(false)
                        data.isDisable = false
                    })
                    
                } else if (data.password.trim()) {
                    data.showMessage = true
                    data.message = '名前を入力してください'
                } else if (data.name.trim()) {
                    data.showMessage = true
                    data.message = 'パスワードを入力してください'
                } else {
                    data.showMessage = true
                    data.message = 'サインイン情報を入力してください'
                }
            }  
        }
        const toSignIn = () => {
            context.emit("show-signin")
        }
        return {
            data,
            toSignIn,
            signInUser,
        }
    },
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