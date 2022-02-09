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
        <transition>
            <v-card
            class="text-center mt-4 card-width d-flex justify-center align-center"
            v-if="data.showMessage"
            color="pa-4"
            >
                <font-awesome-icon class="icon message" :icon="['fas', 'exclamation-triangle']"/>
                <div class="ml-4 message">
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
                    初めての方はこちら
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'

export default defineComponent({
    name: "SignIn", 
    setup(props, context) {
        const { $axios } = useContext()
        const data = reactive({
            show: false,
            showMessage: false,
            name: "",
            password: "",
            message: 'サインイン情報を入力してください',
        })
        const signInUser = async () => {
            if(data.name && data.password) {
                const user = {
                name: data.name,
                password: data.password
                }
                try{
                    const response = await context.root.$auth.loginWith('local', {
                    data: user
                    })
                    console.log(response)
                } catch (err) {
                    console.log(err)
                }
            } else if (data.password) {
                console.log('name empty')
                data.showMessage = true
                data.message = '名前を入力してください'
            } else if (data.name) {
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
</style>