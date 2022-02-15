<template>
    <v-app>
        <app-bar>
            <v-container class="width">
                <v-card v-if="error.statusCode === 404">
                    <v-card-title>ページが見つかりませんでした</v-card-title>
                    <div class="d-flex justify-center py-3">
                        <v-btn
                        outlined
                        @click="goHome">
                            ホームに戻る
                        </v-btn>
                    </div>
                </v-card>
                <v-card v-else>
                    <v-card-title>予期せぬエラーが発生しました</v-card-title>
                    <div class="d-flex justify-center pb-3">
                        <v-btn
                        outlined
                        @click="goHome">
                            ホームに戻る
                        </v-btn>
                    </div>
                </v-card>
            </v-container>
        </app-bar>
        <bottom-nav />
    </v-app>
</template>

<script>
import { defineComponent, useRouter, useMeta } from '@nuxtjs/composition-api'
import AppBar from '../components/AppBar.vue'
import BottomNav from '../components/BottomNav.vue'

export default defineComponent({
  components: { AppBar, BottomNav },
  name: 'EmptyLayout',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head: {},
  setup() {
    const router = useRouter()
    const goHome = () => {
      router.push('/')
    }
    useMeta(() => ({ title: 'エラーが発生しました' }))
    return {
      goHome
    }
  },
  // data() {
  //   return {
  //     pageNotFound: '404 Not Found',
  //     otherError: 'An error occurred',
  //   }
  // },
  // methods: {
  //   goHome: () => {
  //     this.$router.push('/')
  //   }
  // },
  // head() {
  //   const title =
  //     this.error.statusCode === 404 ? this.pageNotFound : this.otherError
  //   return {
  //     title,
  //   }
  // },
})
</script>

<style scoped>
.width {
  max-width: 400px;
}
</style>
