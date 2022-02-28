<template>
    <v-card class="overflow-hidden">
        <v-app-bar
        color="#3871E0"
        dark
        app
        flat
        tile
        >
        <template v-slot:img="{ props }">
            <v-img
            v-bind="props"
            gradient="to bottom left, rgba(56,113,224,.7), rgba(25,32,72,.7)"
            ></v-img>
        </template>

        <v-app-bar-nav-icon
        @click.stop="data.drawer = !data.drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title
        @click="goHome"
        >短答式試験</v-toolbar-title>
        <v-progress-linear
            :active="isLoading"
            :indeterminate="isLoading"
            absolute
            bottom
            color="light-blue"
        ></v-progress-linear>
        </v-app-bar>
        <v-sheet
        class="overflow-y-auto sheet gray"
        height="100vh"
        >
            <v-container class="padding">
                <slot />
            </v-container>
        </v-sheet>
        <v-navigation-drawer
        v-model="data.drawer"
        absolute
        bottom
        temporary
        >
        <v-list
            nav
            dense
        >
            <v-list-item-group
            v-model="data.group"
            active-class="deep-purple--text text--accent-4"
            >
            <v-list-item
            class="my-3 ml-3"
            @click="goHome">
                <v-list-item-icon>
                    <v-icon>mdi-view-dashboard</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>ホーム</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item
            class="my-3 ml-3"
            @click="goStudy">
                <v-list-item-icon>
                    <font-awesome-icon class="font-awesome-size" style="width: 28px" size="2x" :icon="['far', 'edit']" />
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>学習</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item
            class="my-3 ml-3"
            @click="goUserInfo">
                <v-list-item-icon>
                    <font-awesome-icon style="width: 28px" size="2x" :icon="['far', 'address-card']"/>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>ユーザー情報</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item
            class="ml-3"
            @click="logout"
            >
                <v-list-item-icon>
                    <font-awesome-icon style="width: 28px" size="2x" :icon="['fas', 'sign-out-alt']"/>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>ログアウト</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-list-item-group>
        </v-list>
        </v-navigation-drawer>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, useRouter, useContext, computed, inject } from '@nuxtjs/composition-api'
import { GlobalState } from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'

export default defineComponent({
    setup() {
        const data = reactive({
            drawer: false,
            group: null,
        })
        const router = useRouter()
        const { $auth } = useContext()
        const { state } = inject(GlobalKey) as GlobalState

        const isLoading = computed(() => {
            return state.isLoading
        })

        const goHome = () => {
            router.push({path: '/'})
            data.drawer = false
        }
        const goStudy = () => {
            router.push({path: '/unit', query: {
                subject: "cons"
            }})
            data.drawer = false
        }
        const goUserInfo = () => {
            router.push('/user')
            data.drawer = false
        }
        const logout = () => {
            if($auth.loggedIn) {
                $auth.logout()
            }
            data.drawer = false
        }
        return {
            data,
            isLoading,
            goHome,
            goStudy,
            goUserInfo,
            logout,
        }
    }
})
</script>

<style scoped>
.sheet {
    padding-top: 100px;
}
.gray {
    background: #f0f0f0;
}
.icon {
    font-size: 1.5rem;
}
.contain {
    padding: 0;
}
.padding {
    padding-bottom: 55px;
}
</style>