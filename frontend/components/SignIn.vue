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
                    ></v-text-field>

                    <v-text-field
                    v-model="data.password"
                    outlined
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
            name: "",
            password: "",
        })
        const signInUser = async () => {
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
</style>