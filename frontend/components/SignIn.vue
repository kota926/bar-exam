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
                    :rules="[value => !!value || '必須']"
                    ></v-text-field>

                    <v-text-field
                    v-model="data.password"
                    outlined
                    :rules="[value => !!value || '必須']"
                    :append-icon="data.show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="data.show ? 'text' : 'password'"
                    @click:append="data.show = !data.show"
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
                <font-awesome-icon class="icon message" :icon="['fas', 'exclamation-triangle']"/>
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
import { defineComponent, reactive, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
    name: "SignIn", 
    setup(props, context) {
        const { $auth } = useContext()
        const data = reactive({
            show: false,
            showMessage: false,
            name: "",
            password: "",
            message: 'サインイン情報を入力してください',
        })
        const signInUser = async () => {
            if(data.name.trim() && data.password.trim()) {
                const user = {
                name: data.name.trim(),
                password: data.password.trim()
                }
                try{
                    const response = await $auth.loginWith('local', {
                    data: user
                    })
                } catch (err) {
                    console.log(err)
                    data.showMessage = true
                    data.message = 'ユーザーネームまたはパスワードが正しくありません'
                }
            } else if (data.password.trim()) {
                console.log('name empty')
                data.showMessage = true
                data.message = '名前を入力してください'
            } else if (data.name.trim()) {
                console.log('password empty')
                data.showMessage = true
                data.message = 'パスワードを入力してください'
            } else {
                console.log('empty')
                data.showMessage = true
                data.message = 'サインイン情報を入力してください'
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