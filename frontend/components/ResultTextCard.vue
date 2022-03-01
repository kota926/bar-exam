<template>
    <v-container>
    <v-card>
        <div class="d-flex align-center">
            <v-card-title
            class="text-body-2 text-sm-h6"
            >{{ year }}年 第{{ q_number }}問 第{{ c_number }}択
            </v-card-title>
        </div>
        <v-card-text>
            {{ choice.question.question }}
        </v-card-text>
        <v-card-text>
            {{ choice.c1 }}
        </v-card-text>
        <v-card-text v-show="choice.c2">
            {{ choice.c2 }}
        </v-card-text>
        <v-card-text>
            正解: {{ answer}}
        </v-card-text>
    </v-card>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api'
import { Choice } from '../types/Choice'
import HiddenChoiceText from './HiddenChoiceText.vue'
import HiddenQuestionText from './HiddenQuestionText.vue'


export default defineComponent({
    components: { HiddenQuestionText, HiddenChoiceText },
    props: {
        choice: {
            type: Object as PropType<Choice>,
            required: true,
        }
    },
    setup (props) {
        const year = computed(() => {
            return props.choice.id.slice(3, 7)
        })
        const q_number = computed(() => {
            if(props.choice.id.slice(7, 8) === '0') {
                return props.choice.id.slice(8, 9)
            } else {
                return props.choice.id.slice(7, 9)
            }
        })
        const c_number = computed(() => {
            return props.choice.id.slice(9)
        })
        const answer = computed(() => {
            if(props.choice.answer === '1') {
                return "○"
            } else {
                return "×"
            }
        })

        return {
            year,
            q_number,
            c_number,
            answer
        }
    }
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