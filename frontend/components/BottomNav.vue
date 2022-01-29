<template>
    <v-bottom-navigation
        color="teal"
        grow
    >
        <v-btn
        to="/"
        @click="goHome"
        >
        <span>HOME</span>
        <font-awesome-icon class="icon" :icon="['fas', 'home']"/>
        </v-btn>

        <v-btn
        to="/unit?subject=cons"
        @click="goUnit"
        >
        <span>STUDY</span>
        <font-awesome-icon class="icon" :icon="['far', 'edit']"/>
        </v-btn>
    </v-bottom-navigation>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
    setup(props, context) {
        const router = useRouter()
        const goHome = () => {
            router.push({ path: '/' })
        }
        const goUnit = () => {
            router.push({path: '/unit', query: {
                subject: "憲法"
            }})
        }
        return {
            goHome,
            goUnit,
        }
    }
})
</script>

<style scoped>
.icon {
    font-size: 1.5rem;
}
</style>