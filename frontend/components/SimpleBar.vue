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
            :active="data.loading"
            :indeterminate="data.loading"
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
    </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
    setup () {
        const data = reactive({
            loading: true
        })

        return {
            data
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