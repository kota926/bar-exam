<template>
    <v-card
    v-if="isTypeA"
    class="mt-2"
    >
        <v-card-text>
            {{ state.choices[state.index] ? state.choices[state.index].c1 : "" }}
        </v-card-text>
    </v-card>
    <v-card
    v-else-if="isTypeB"
    >
        <v-card
        class="d-flex align-center mb-1"
        >
            <v-card
            flat
            >
                <v-card-text
                class="pr-0">
                    a
                </v-card-text>
            </v-card>
            <v-card
            flat
            >
                <v-card-text>
                    {{ state.choices[state.index] ? state.choices[state.index].c1 : "" }}
                </v-card-text>
            </v-card>
        </v-card>
        <v-card
        class="d-flex align-center"
        flat
        >
            <v-card
            flat
            >
                <v-card-text
                class="pr-0">
                    b
                </v-card-text>
            </v-card>
            <v-card
            flat
            >
                <v-card-text>
                    {{ state.choices[state.index] ? state.choices[state.index].c2 : "" }}
                </v-card-text>
            </v-card>
        </v-card>
    </v-card>
    <v-card
    v-else-if="isTypeC"
    >
        <v-card
        class="d-flex align-center mb-1"
        >
            <v-card
            flat
            >
                <v-card-text
                class="pr-0">
                    a
                </v-card-text>
            </v-card>
            <v-card
            flat
            >
                <v-card-text>
                    {{ state.choices[state.index] ? state.choices[state.index].c1 : "" }}
                </v-card-text>
            </v-card>
        </v-card>
        <v-card
        class="d-flex align-center"
        flat
        >
            <v-card
            flat
            >
                <v-card-text
                class="pr-0">
                    b
                </v-card-text>
            </v-card>
            <v-card
            flat
            >
                <v-card-text>
                    {{ state.choices[state.index] ? state.choices[state.index].c2 : "" }}
                </v-card-text>
            </v-card>
        </v-card>
    </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType } from '@nuxtjs/composition-api'
import { ChoiceState } from '../../composables/state/choiceState'
import ChoiceKey from '../../composables/key/choiceKey'

export default defineComponent({
    name: 'ConstitutionChoiceText',
    setup() {
        const { state } = inject(ChoiceKey) as ChoiceState
        const isTypeA = computed(() => {   
            if(!state.choices[state.index]) {
                return true
            }
            if(state.choices[state.index].question.type === 'a') {
                return true
            } else {
                return false
            }
        })

        const isTypeB = computed(() => {
            if(!state.choices[state.index]) {
                return false
            }
            if(state.choices[state.index].question.type === 'b') {
                return true
            } else {
                return false
            }
        })

        const isTypeC = computed(() => {
            if(!state.choices[state.index]) {
                return false
            }
            if(state.choices[state.index].question.type === 'c') {
                return true
            } else {
                return false
            }
        })

        return {
            state,
            isTypeA,
            isTypeB,
            isTypeC,
        }
    }
})
</script>

<style scoped>

</style>