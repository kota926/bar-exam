<template>
    <div>
        <app-bar>
            <v-container class="width">
                <user-admin
                v-if="data.isShow"
                @change-info="hideAdmin"
                />
                <change-user-info
                :infoName="data.info"
                @back-admin="showAdmin"
                v-else
                />
            </v-container>
        </app-bar>
        <bottom-nav />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import AppBar from '../components/AppBar.vue'
import BottomNav from '../components/BottomNav.vue'
import ChangeUserInfo from '../components/ChangeUserInfo.vue'
import UserAdmin from '../components/UserAdmin.vue'

export default defineComponent({
    components: { AppBar, BottomNav, UserAdmin, ChangeUserInfo },
    middleware: 'auth',
    layout: "default",
    setup () {
        const data = reactive({
            isShow: true,
            info: 'name',
        })
        const hideAdmin = (info: string) => {
            data.info = info
            data.isShow = false
        }
        const showAdmin = () => {
            data.isShow = true
        }

        return {
            data,
            hideAdmin,
            showAdmin
        }
    }
})
</script>

<style scoped>
.icon {
    font-size: 40px;
}
.width {
    max-width: 600px;
}
</style>