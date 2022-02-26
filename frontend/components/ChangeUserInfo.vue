<template>
<div>
    <v-card
    v-if="isName"
    >
        <v-card-title>ユーザーネームの変更</v-card-title>
        <v-card-text class="d-flex">
            <div>現在のユーザーネーム:</div>
            <div class="ml-3">{{ user ? user.name : 'name'}}</div>
        </v-card-text>
        <v-form
                ref="form"
                lazy-validation
            >
            <v-container>
                <v-text-field
                v-model="data.name"
                outlined
                label="新しいユーザーネーム"
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
                    @click="sendNameInfo"
                    :disabled="data.isDisable"
                    >
                        登録
                    </v-btn>
                </v-row>
            </v-container>
            </v-form>
    </v-card>

    <v-card
    v-else-if="isEmail"
    >
        <v-card-title>メールアドレスの変更</v-card-title>
        <v-card-text class="d-flex flex-wrap">
            <div>現在のメールアドレス:</div>
            <div class="ml-3">{{ user ? user.email : 'sample@gmail.com'}}</div>
        </v-card-text>
        <v-form
                ref="form"
                
                lazy-validation
            >
            <v-container>
                <v-text-field
                v-model="data.email"
                outlined
                label="新しいメールアドレス"
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
                    @click="sendEmailInfo"
                    :disabled="data.isDisable"
                    >
                        登録
                    </v-btn>
                </v-row>
            </v-container>
            </v-form>
    </v-card>

    <v-card
    v-else
    >
        <v-card-title>パスワードの変更</v-card-title>
        <v-form
                ref="form"
                
                lazy-validation
            >
            <v-container>
                <v-text-field
                v-model="data.oldPassword"
                outlined
                label="現在のパスワード"
                required
                :disabled="data.isDisable"
                ></v-text-field>
                <v-text-field
                v-model="data.newPassword"
                outlined
                label="新しいパスワード"
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
                    @click="sendPasswordInfo"
                    :disabled="data.isDisable"
                    >
                        登録
                    </v-btn>
                </v-row>
            </v-container>
            </v-form>
    </v-card>

    <transition name="top">
        <v-card
        class="text-center mb-4 card-width d-flex justify-center align-center message"
        v-if="data.showMessage"
        color="pa-4"
        >
            <!-- <font-awesome-icon class="icon" icon="fa-solid fa-exclamation-triangle"/> -->
            <font-awesome-icon style="width: 28px" size="2x" :icon="['fas', 'exclamation-triangle']"/>
            <div class="ml-2">
                {{ data.message }}
            </div>
        </v-card>
    </transition>

    <v-card
    class="d-flex justify-center">
        <v-btn
        outlined
        color="error"
        class="my-3"
        @click="backAdmin"
        >キャンセル</v-btn>
    </v-card>
</div>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext, computed, watch, inject } from '@nuxtjs/composition-api'
import { GlobalState } from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'

export default defineComponent({
    props: {
        infoName: {
            type: String,
            // required: true,
            default: 'name'
        }
    },
    setup (props, context) {
        const { setIsLoading } = inject(GlobalKey) as GlobalState
        const data = reactive({
            email: '',
            name: '',
            oldPassword: '',
            newPassword: '',
            isDisable: false,
            showMessage: false,
            message: '空欄です'
            // isName: true,
            // isEmail: true,
        })
        const { $auth, $axios } = useContext()
        const user = computed(() => {
            if($auth.user) {
                return $auth.user
            } else {
                return null
            }
        })

        const isName = computed(() => {
            if(props.infoName === 'name') {
                return true
            } else {
                return false
            }
        })

        const isEmail = computed(() => {
            if(props.infoName === 'email') {
                return true
            } else {
                return false
            }
        })

        const sendNameInfo = () => {
            if(data.name.trim()) {
                setIsLoading(true)
                $axios.$put('/auth/user/', {
                    name: data.name.trim(),
                    email: null,
                    oldPassword: null,
                    newPassword: null
                }).then((res) => {
                    $auth.setUserToken(res.token).then((res) =>{
                        context.emit('back-admin')
                        setIsLoading(false)
                    }).catch((err) => {
                        console.log(err)
                        data.message = '予期せぬエラーが発生しました'
                        data.showMessage = true
                        setIsLoading(false)
                    })
                }).catch((err) => {
                    console.log(err)
                    data.message = '予期せぬエラーが発生しました'
                    data.showMessage = true
                    setIsLoading(false)
                })
            } else {
                data.message = 'ユーザーネームを入力してください'
                data.showMessage = true
            }
        }

        const sendEmailInfo = () => {
            if(data.email.trim()) {
                setIsLoading(true)
                $axios.$put('/auth/user/', {
                    name: null,
                    email: data.email.trim(),
                    oldPassword: null,
                    newPassword: null
                }).then((res) => {
                    $auth.setUserToken(res.token).then((res) =>{
                        context.emit('back-admin')
                        setIsLoading(false)
                    }).catch((err) => {
                        console.log(err)
                        data.message = '予期せぬエラーが発生しました'
                        data.showMessage = true
                        setIsLoading(false)
                    })
                }).catch((err) => {
                    console.log(err)
                    data.message = '予期せぬエラーが発生しました'
                    data.showMessage = true
                    setIsLoading(false)
                })
            } else {
                data.message = 'メールアドレスを入力してください'
                data.showMessage = true
            }
        }

        const sendPasswordInfo = () => {
            if(data.oldPassword.trim() && data.newPassword.trim()) {
                setIsLoading(true)
                $axios.$put('/auth/user/', {
                    name: null,
                    email: null,
                    oldPassword: data.oldPassword.trim(),
                    newPassword: data.newPassword.trim()
                }).then((res) => {
                    setIsLoading(false)
                    if(res.message === "password is not correct") {
                        data.message = 'パスワードが誤っています'
                        data.showMessage = true
                        data.oldPassword = ""
                        data.newPassword = ""
                    } else {
                        $auth.setUserToken(res.token).then((res) =>{
                            context.emit('back-admin')
                        }).catch((err) => {
                            console.log(err)
                            data.message = '予期せぬエラーが発生しました'
                            data.showMessage = true
                        })
                    }
                }).catch((err) => {
                    setIsLoading(false)
                    console.log(err)
                    data.message = '予期せぬエラーが発生しました'
                    data.showMessage = true
                })
            } else {
                data.message = 'パスワードを入力してください'
                data.showMessage = true
            }
        }

        const backAdmin = () => {
            context.emit('back-admin')
        }

        return {
            data,
            user,
            sendNameInfo,
            sendEmailInfo,
            sendPasswordInfo,
            isName,
            isEmail,
            backAdmin
        }
    }
})
</script>

<style scoped>
.message {
    color: brown;
    /* transition: 0.5; */
}
.top-enter-active, .top-leave-active {
  transform: translate(0px, 0px); 
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.top-enter, .top-leave-to {
  transform: translateY(-5vh) translateY(0px);
}
</style>