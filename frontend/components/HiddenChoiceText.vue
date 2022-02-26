<template>
    <v-card>
        <v-expand-transition>
            <div v-show="!data.show">
                <v-card-text
                @click="isShow"
                class="clamp">
                    {{ choice.c1 }}
                </v-card-text>
            </div>
        </v-expand-transition>
        <v-expand-transition>
            <div
            v-show="data.show"
            >
                <v-card-text
                @click="isShow">
                <div>
                    {{ choice.c1 }}
                </div>
                <div v-show="existC2">
                    {{ choice.c2}}
                </div>
                <div class="mt-3 ml-auto">
                    正解 : {{ answer }}
                </div>
                </v-card-text>
            </div>
        </v-expand-transition>
    </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from '@nuxtjs/composition-api'

export default defineComponent({
    props: {
        choice: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const data = reactive({
            show: false
        })
        const isShow = () => {
            data.show = !data.show
        }
        const existC2 = computed(() => {
            const isNull = props.choice.c2 === null
            return !isNull
        })
        const answer = computed(() => {
            if(props.choice.answer === 1 || props.choice.answer === '1') {
                return "○"
            } else {
                return "×"
            }
        })


        return {
            data,
            isShow,
            existC2,
            answer,
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