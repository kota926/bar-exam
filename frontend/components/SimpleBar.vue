<template>
    <v-card class="overflow-hidden">
        <v-app-bar
        color="#3871E0"
        dark
        app
        >
        <template v-slot:img="{ props }">
            <v-img
            v-bind="props"
            gradient="to bottom left, rgba(56,113,224,.7), rgba(25,32,72,.7)"
            ></v-img>
        </template>

        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>短答式試験</v-toolbar-title>
        <v-progress-linear
            :active="isLoading"
            :indeterminate="isLoading"
            absolute
            bottom
            color="light-blue"
        ></v-progress-linear>
        </v-app-bar>
        <v-sheet
        class="overflow-y-auto sheet"
        height="100vh"
        >
        <v-container class="contain">
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
            </v-list-item-group>
        </v-list>
        </v-navigation-drawer>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, inject, computed, useRouter } from '@nuxtjs/composition-api'
import { GlobalState } from '../composables/state/globalState'
import GlobalKey from '../composables/key/globalKey'

export default defineComponent({
    setup () {
        const data = reactive({
            drawer: false,
            group: null,
        })
        const { state } = inject(GlobalKey) as GlobalState
        const router = useRouter()
        
        const isLoading = computed(() => {
            return state.isLoading
        })

        const goHome = () => {
            router.push('/')
        }

        return {
            data,
            isLoading,
            goHome
        }
    }
})
</script>

<style scoped>
.sheet {
    padding-top: 100px;
    background: #f0f0f0;
}
.icon {
    font-size: 1.5rem;
}
.contain {
    padding: 0;
}
</style>