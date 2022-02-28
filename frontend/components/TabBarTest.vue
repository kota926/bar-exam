<template>
    <v-card class="overflow-hidden">
        <v-app-bar
        color="#3871E0"
        dark
        app
        flat
        tile
        hide-on-scroll
        scroll-target="#scrolling-techniques-4"
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
        <template v-slot:extension>
            <font-awesome-icon @click="back" style="width: 27px" :icon="['far', 'caret-square-left']" />
            <v-tabs
            fixed-tabs
            center-active
            show-arrows
            v-model="data.selectedSubject"
            >
                <v-tab
                @click="subject('cons')"
                key='憲法'
                >憲法</v-tab>
                <v-tab
                @click="subject('gov')"
                key='行政法'
                >行政</v-tab>
                <v-tab
                @click="subject('civil')"
                key='民法'
                >民法</v-tab>
                <v-tab
                @click="subject('company')"
                key='商法'
                >商法</v-tab>
                <!-- <v-tab
                @click="subject('civil-pro')"
                key='民訴'
                >民訴</v-tab>
                <v-tab
                @click="subject('criminal')"
                key='刑法'
                >刑法</v-tab>
                <v-tab
                @click="subject('criminal-pro')"
                key='刑訴'
                >刑訴</v-tab>                -->
            </v-tabs>
            <v-progress-linear
                :active="isLoading"
                :indeterminate="isLoading"
                absolute
                bottom
                color="light-blue"
            ></v-progress-linear>
        </template>
        </v-app-bar>
        <v-sheet
        id="scrolling-techniques-4"
        class="overflow-y-auto sheet gray"
        height="99vh"
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
import { defineComponent, useRouter, computed, reactive, watch, onMounted, useContext, inject } from '@nuxtjs/composition-api'
import { GlobalState } from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'

export default defineComponent({
    setup(props, context) {
        const data = reactive({
            selectedSubject: 1,
            drawer: false,
            group: null,
        })
        const router = useRouter()
        const { $auth } = useContext()
        const { state } = inject(GlobalKey) as GlobalState

        const isLoading = computed(() => {
            return state.isLoading
        })

        onMounted(() => {
            switch(context.root.$route.query.subject) {
                    case 'cons':
                        data.selectedSubject = 0
                    break;
                    case 'gov':
                        data.selectedSubject = 1
                    break;
                    case 'civil':
                        data.selectedSubject = 2
                    break;
                    case 'company':
                        data.selectedSubject = 3
                    break;
                    case 'minso':
                        data.selectedSubject = 4
                    break;
                    case 'criminal':
                        data.selectedSubject = 5
                    break;
                    case 'keiso':
                        data.selectedSubject = 6
                    break;
                    default:
                        data.selectedSubject = 0
                }
        })

        const currentQuery = computed(() => {
            return context.root.$route.query.subject
        })

        watch(currentQuery, (newVal, oldVal) => {
            if(typeof newVal === 'string') {
                switch(newVal) {
                    case 'cons':
                        data.selectedSubject = 0
                    break;
                    case 'gov':
                        data.selectedSubject = 1
                    break;
                    case 'civil':
                        data.selectedSubject = 2
                    break;
                    case 'company':
                        data.selectedSubject = 3
                    break;
                    case 'minso':
                        data.selectedSubject = 4
                    break;
                    case 'criminal':
                        data.selectedSubject = 5
                    break;
                    case 'keiso':
                        data.selectedSubject = 6
                    break;
                    default:
                        data.selectedSubject = 0
                }
            }
        })

        const back = () => {
            router.go(-1)
        }
        const subject = (sub: string) => {
            router.push({path: "/unit", query: {
                subject: sub
            }})
        }
        const goHome = () => {
            router.push('/')
        }
        const goStudy = () => {
            router.push({path: '/unit', query: {
                subject: "cons"
            }})
            data.drawer = false
        }
        const toStudy = () => {
            router.push('/unit')
        }
        const goUserInfo = () => {
            router.push('/user')
        }
        const logout = () => {
            $auth.logout()
        }
        
        return {
            data,
            isLoading,
            back,
            subject,
            goHome,
            goStudy,
            toStudy,
            goUserInfo,
            logout,
        }
    }
})
</script>

<style scoped>
.sheet {
    padding-top: 120px;
    
}
.gray {
    background: #f0f0f0;
}
.iconsize {
    font-size: 2px;
}
.contain {
    padding: 0;
}
.padding {
    padding-bottom: 60px;
}
</style>