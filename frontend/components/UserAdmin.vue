<template>
<div>
    <v-card>
        <v-card-title>ユーザー情報</v-card-title>
    </v-card>
    <v-card
    tile
    class="pl-4 py-3 d-flex align-center justify-space-between">
        <div class="d-flex align-center">
            <font-awesome-icon style="width: 28px" :icon="['far', 'user-circle']"/>
            <div class="ml-3 text-h5">{{ user.name }}</div>
        </div>
        <v-btn
        outlined
        color="primary"
        class="mr-3"
        @click="changeInfo('name')"
        >変更</v-btn>
    </v-card>
    <v-card
    tile
    class="pl-4 py-3 d-flex align-center justify-space-between flex-wrap">
        <div class="d-flex align-center">
            <v-icon
            
            color="teal darken-2"
            >
            mdi-email
            </v-icon>
            <div class="ml-3">{{ user.email }}</div>
        </div>
        <v-btn
        outlined
        color="primary"
        class="mr-3 ml-auto my-2"
        @click="changeInfo('email')"
        >変更</v-btn>
    </v-card>
    <v-card
    tile
    class="pl-4 py-3 d-flex align-center justify-space-between">
        <div class="d-flex align-center">
            <font-awesome-icon style="width: 28px" :icon="['fas', 'key']"/>
            <div class="ml-3">••••••••</div>
        </div>
        <v-btn
        outlined
        color="primary"
        class="mr-3"
        @click="changeInfo('password')"
        >変更</v-btn>
    </v-card>
    <v-card
    tile
    class="pl-4 py-3 mt-10 d-flex align-center justify-space-between">
        <div class="d-flex align-center">
            <font-awesome-icon size="2x" style="width: 27px" :icon="['far', 'trash-alt']"/>
            <div class="ml-3">学習履歴の削除</div>
        </div>
        <v-btn
        outlined
        color="red"
        class="mr-3"
        @click="confirmDeleteRecord"
        >削除</v-btn>
    </v-card>
    <v-card
    tile
    class="pl-4 py-3 d-flex align-center justify-space-between">
        <div class="d-flex align-center">
            <font-awesome-icon size="2x" style="width: 27px" :icon="['far', 'trash-alt']"/>
            <div class="ml-3">アカウントの削除</div>
        </div>
        <v-btn
        outlined
        color="red"
        class="mr-3"
        @click="confirmDeleteAccount"
        >削除</v-btn>
    </v-card>
    <v-dialog
      v-model="data.recordDialog"
      max-width="380"
      :persistent="data.isDisable"
    >
      <v-card>
        <v-card-title class="text-h5">
          学習履歴を削除しますか？
        </v-card-title>

        <v-card-text>
          学習履歴を削除した場合、修復をすることはできません。
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click="data.recordDialog = false"
            :disabled="data.isDisable"
          >
            キャンセル
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="deleteRecord"
            :disabled="data.isDisable"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="data.accountDialog"
      max-width="380"
      :persistent="data.isDisable"
    >
      <v-card>
        <v-card-title class="text-h5">
          アカウントを削除しますか？
        </v-card-title>
        <v-card-text>
          確認のためパスワードを入力してください。
        </v-card-text>
        
        <v-text-field
        v-model="data.password"
        outlined
        label="パスワード"
        required
        class="mx-5"
        :disabled="data.isDisable"
        ></v-text-field>

        <transition name="top">
            <v-card
            flat
            class="text-center mb-10 card-width d-flex justify-center align-center"
            v-if="data.showMessage"
            >
                <font-awesome-icon class="message" size="lg" style="width: 28px" :icon="['fas', 'exclamation-triangle']"/>
                <div class="ml-2 message">
                    パスワードが正しくありません
                </div>
            </v-card>
        </transition>
       
        <v-card-text>
          アカウントを削除した場合、修復をすることはできません。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click="data.accountDialog = false"
            :disabled="data.isDisable"
          >
            キャンセル
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="deleteAccount"
            :disabled="data.isDisable"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>

<script lang="ts">
import { defineComponent, useContext, computed, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
    setup (props, context) {
        const { $auth, $axios } = useContext()

        const data = reactive({
            recordDialog: false,
            accountDialog: false,
            isDisable: false,
            password: '',
            showMessage: false,
        })

        const user = computed(() => {
            if($auth.user) {
                return $auth.user
            } else {
                return {
                    name: 'name',
                    email: 'sample@gmail.com',
                    password: 'password',
                }
            }
        })

        const changeInfo = (info: string) => {
            context.emit('change-info', info)
        }
        const confirmDeleteRecord = () => {
            data.recordDialog = true
        }
        const confirmDeleteAccount = () => {
            data.accountDialog = true
        }
        const deleteRecord = () => {
            data.isDisable = true
            $axios.$put('/api/done', {
                isDelete: true,
            }).then((res) => {
                console.log(res)
                data.isDisable = false
                data.recordDialog = false
            })
        }
        const deleteAccount = () => {
            if(data.password.trim()) {
                data.isDisable = true
                $axios.$delete('/auth/user', {
                    data: {
                        password: data.password.trim()
                    }
                }).then((res) => {
                    if(res.message === 'password is not correct') {
                        data.showMessage = true
                        data.isDisable = false
                    } else {
                        $auth.logout()
                        data.isDisable = false
                        data.accountDialog = false
                    }
                })
            }
        }
        return {
            user,
            data,
            changeInfo,
            confirmDeleteRecord,
            confirmDeleteAccount,
            deleteRecord,
            deleteAccount,
        }
    }
})
</script>

<style scoped>
.width {
    max-width: 700px;
}
.icon {
    font-size: 26px;
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