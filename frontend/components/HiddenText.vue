<template>
    <v-container>
    <v-card>
        <div class="d-flex align-center">
            <v-card-title
            class="text-body-2 text-sm-h6"
            >第2問
            </v-card-title>
            <unit-chip
            :subject="question.choices[0].subject"
            :unit="question.choices[0].unit"
            />
        </div>
        <hidden-question-text
        :text="question.question"
        />
        <hidden-choice-text
        v-for="(choice, index) in question.choices" :key="index"
        :choice="choice"
        />
    </v-card>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import HiddenChoiceText from './HiddenChoiceText.vue'
import HiddenQuestionText from './HiddenQuestionText.vue'
import UnitChip from './UnitChip.vue'

export default defineComponent({
    components: { HiddenQuestionText, HiddenChoiceText, UnitChip },
    props: {
        question: {
            type: Object,
            required: true,
        }
    },
    setup () {
        // const question = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaakdfjlak;dj'

        // const choice = {
        //     c1: "c1c1c1c1c1c1c",
        //     c2: "c2c2c2c2c2c2c2",
        //     answer: "×"
        // }

        // const subject = '憲法'

        // const unit = "4"

        // return {
        //     question,
        //     choice,
        //     subject,
        //     unit
        // }
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