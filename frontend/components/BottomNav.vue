<template>
    <v-bottom-navigation
        color="teal"
        grow
        fixed
        height="68"
    >
        <v-btn
        to="/"
        class="pb-2"
        @click="goHome"
        >
        <span>HOME</span>
        <font-awesome-icon class="font-awesome-size" style="width: 28px" size="2x" :icon="['fas', 'home']"/>
        </v-btn>

        <v-btn
        to="/unit?subject=cons"
        class="pb-2"
        @click="goUnit"
        >
        <span>STUDY</span>
        <font-awesome-icon class="font-awesome-size" style="width: 28px" size="2x" :icon="['far', 'edit']"/>
        </v-btn>
    </v-bottom-navigation>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
    setup() {
        const router = useRouter()
        const goHome = () => {
            router.push({ path: '/' })
        }
        const goUnit = () => {
            router.push({path: '/unit', query: {
                subject: "cons"
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
.iconsize {
    font-size: 1.5rem;
}
.font-awesome-size {
    font-size: 25px;
}
</style>