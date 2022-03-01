<template>
    <div class="mx-4">
        <v-sheet
        class="mx-auto text-caption"
        elevation="0"
        >
            <span>回答数</span>
            <span>{{ doneNum }}</span>
            <span>/</span>
            <span>問題数</span>
            <span>{{ totalNum ? totalNum : 0 }}</span>
        </v-sheet>
        <v-sheet
        class="d-flex mx-auto bar"
        height="8"
        >
            <v-sheet
            :width="donePercent"
            class="done"
            ></v-sheet>
        </v-sheet>
    </div>
</template>

<script lang="ts">
import { defineComponent,computed, inject } from '@nuxtjs/composition-api'

export default defineComponent({
    props: {
        totalNum: {
            type: Number,
            default: 0,
        },
        doneNum: {
            type: Number,
            default: 0,
        }
    },
    setup (props) {
        const donePercent = computed(() => {
            if(props.totalNum === 0 || props.totalNum === null ) return 0 + '%'
            const percent = props.doneNum / props.totalNum * 100
            return percent + '%'
        })

        const remainedPercent = computed(() => {
            if(props.totalNum === 0 || props.totalNum === null ) return 100 + '%'
            const percent = (1 - props.doneNum / props.totalNum) * 100
            return percent + '%'
        })
        return {
            donePercent,
            remainedPercent,
        }
    }
})
</script>

<style scoped>
.done {
    background: royalblue;
    transition: 0.9s;
}
.bar {
    background: silver;
}
</style>