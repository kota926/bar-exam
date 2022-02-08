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
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, useContext } from '@nuxtjs/composition-api'
import { AuthState } from '../composables/state/authState'
import AuthKey from '../composables/key/authKey'

export default defineComponent({
    setup(props, context) {
        const { mutateEmail } = inject(AuthKey) as AuthState
        const { $axios } = useContext()
        const data = reactive({
            name: '',
            email: '',
            password: '',
            isDisable: false,
        })
        const signUp = () => {
            mutateEmail(data.email)
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
        }
        return {
            data,
            signUp,
        }
    }
})
</script>

<style scoped>
.card-width {
    max-width: 600px;
    margin: 0 auto;
}
</style>