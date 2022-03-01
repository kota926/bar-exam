<template>
    <v-card>
        <v-expand-transition>
            <div v-show="!data.show">
                <v-card-text
                @click="isShow"
                class="clamp">
                    {{ text }}
                </v-card-text>
            </div>
        </v-expand-transition>
        <v-expand-transition>
            <div
            v-show="data.show"
            >
                <v-card-text
                @click="isShow">
                {{ text }}
                </v-card-text>
            </div>
        </v-expand-transition>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
    props: {
        text: {
            type: String,
            required: true
        }
    },
    setup() {
        const data = reactive({
            show: false
        })
        const isShow = () => {
            data.show = !data.show
        }


        return {
            data,
            isShow
        }
    },
})
</script>

<style scoped>
.clamp {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.long {
    padding-top: 0;
}
</style>