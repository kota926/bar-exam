<template>
    <v-card class="overflow-hidden">
        <v-app-bar
        color="#3871E0"
        dark
        app
        hide-on-scroll
        scroll-target="#scrolling-techniques-4"
        >
        <template v-slot:img="{ props }">
            <v-img
            v-bind="props"
            gradient="to bottom left, rgba(56,113,224,.7), rgba(25,32,72,.7)"
            ></v-img>
        </template>

        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>短答式試験</v-toolbar-title>
        <template v-slot:extension>
            <font-awesome-icon @click="back" class="icon" :icon="['far', 'caret-square-left']"/>
            <v-tabs
            fixed-tabs
            center-active
            show-arrows
            v-model="data.selectedSubject"
            >
                <v-tab
                @click="subject('憲法')"
                key='憲法'
                >憲法</v-tab>
                <v-tab
                @click="subject('行政法')"
                key='行政法'
                >行政</v-tab>
                <v-tab
                @click="subject('民法')"
                key='民法'
                >民法</v-tab>
                <v-tab
                @click="subject('商法')"
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
        </template>
        </v-app-bar>
        <v-sheet
        id="scrolling-techniques-4"
        class="overflow-y-auto sheet"
        height="90vh"
        >
        <v-container>
            <slot />
        </v-container>
        </v-sheet>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, useRouter, computed, reactive, watch, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
    setup(props, context) {
        const data = reactive({
            selectedSubject: 1,
        })
        const router = useRouter()

        onMounted(() => {
            switch(context.root.$route.query.subject) {
                    case '憲法':
                        data.selectedSubject = 0
                    break;
                    case '行政法':
                        data.selectedSubject = 1
                    break;
                    case '民法':
                        data.selectedSubject = 2
                    break;
                    case '商法':
                        data.selectedSubject = 3
                    break;
                    case '民訴':
                        data.selectedSubject = 4
                    break;
                    case '刑法':
                        data.selectedSubject = 5
                    break;
                    case '刑訴':
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
                    case '憲法':
                        data.selectedSubject = 0
                    break;
                    case '行政法':
                        data.selectedSubject = 1
                    break;
                    case '民法':
                        data.selectedSubject = 2
                    break;
                    case '商法':
                        data.selectedSubject = 3
                    break;
                    case '民訴':
                        data.selectedSubject = 4
                    break;
                    case '刑法':
                        data.selectedSubject = 5
                    break;
                    case '刑訴':
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
        const toHome = () => {
            router.push('/')
        }
        const toStudy = () => {
            router.push('/unit')
        }
        // watch(data, (newValue, oldValue) => {
        //     console.log(oldValue)
        // })
        return {
            data,
            back,
            subject,
            toHome,
            toStudy,
        }
    }
})
</script>

<style scoped>
.sheet {
    padding-top: 120px;
    background: #f0f0f0;
}
.icon {
    font-size: 1.5rem;
}
.contain {
    padding: 0;
}
</style>