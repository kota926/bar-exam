<template>
    <v-container>
    <v-card>
        <div class="d-flex align-center">
            <v-card-title
            class="text-body-2 text-sm-h6"
            >{{ year }}年 第{{ q_number }}問 第{{ c_number }}択
            </v-card-title>
        </div>
        <hidden-question-text
        :text="choice.question.question"
        />
        <hidden-choice-text
        :choice="choice"
        />
    </v-card>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import HiddenChoiceText from './HiddenChoiceText.vue'
import HiddenQuestionText from './HiddenQuestionText.vue'
import UnitChip from './UnitChip.vue'

export default defineComponent({
    components: { HiddenQuestionText, HiddenChoiceText, UnitChip },
    props: {
        choice: {
            type: Object,
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
        // const question = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaakdfjlak;dj'

        // const choice = {
        //     c1: "c1c1c1c1c1c1c",
        //     c2: "c2c2c2c2c2c2c2",
        //     answer: "×"
        // }

        // const subject = '憲法'

        // const unit = "4"

        return {
            year,
            q_number,
            c_number
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