<template>
    <v-card
    v-if="data.deferredPrompt"
    >
        <v-card-title>
            ホームスクリーンに追加
        </v-card-title>
        <v-card-text>
            ブラウザの機能によりデバイスにアプリをインストールします。ブックマークのようにホームスクリーンに追加され、スマホアプリのような機能を体験できます。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="dismiss"
          >
            キャンセル
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="install"
          >
            OK
          </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
    setup() {
        const data = reactive({
            deferredPrompt: null,
        })
        window.addEventListener("beforeinstallprompt", e => {
            e.preventDefault();
            console.log(e)
            data.deferredPrompt = e
        })
        window.addEventListener("appinstalled", () => {
            data.deferredPrompt = null
        })
        const dismiss = () => {
            data.deferredPrompt = null
        }
        const install = () => {
            data.deferredPrompt.prompt();
        }
        return {
            data,
            dismiss,
            install,
        }
    }
})
</script>

<style lang="scss" scoped>

</style>