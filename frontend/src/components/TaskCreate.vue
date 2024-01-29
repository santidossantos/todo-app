<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useValidationErrors } from '@/helpers/validation-errors'
import { FORM_REQUIRED_FIELD } from '@/helpers/messages'
import { client } from '@/services/OpenAPIClient';
import type { TaskForm } from '@/types/task-form'


const form = ref<TaskForm>({
    description: '',
    category: ''
})

const rules = {
    description: {
        required: helpers.withMessage(FORM_REQUIRED_FIELD, required)
    },
    /* category: {
        required: helpers.withMessage(FORM_REQUIRED_FIELD, required)
    } */
}

const v$ = useVuelidate(rules, form)

const errors = computed(() => useValidationErrors<any>(v$.value.$errors))

const categories = [
    'Food', 'Work', 'Study', 'Sport', 'Other'
]

const emit = defineEmits(['setTasks'])


const handleSubmit = async () => {
    const result = await v$.value.$validate()
    if (!result) return
    const task = {
        description: form.value.description,
        active: true,
    }
    await createTask(task)
    emit('setTasks', task)
}

const createTask = async (task: any) => {
    await client['TaskController.create'](null, task)
}


</script>

<template>
    <v-card class="mx-auto" width="400" prepend-icon="mdi-calendar">
        <template v-slot:title>
            <h4>New Task</h4>
        </template>

        <v-card-text>
            <v-form @submit.prevent="handleSubmit" class="form">
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="v$.description.$model" label="Task description" bg-color="white"
                            :error="v$.description.$error" :error-messages="errors.description" />
                    </v-col>
                </v-row>
                <!-- <v-row>
                    <v-col class="select-row" cols="12">
                        <v-select class="select-category" v-model="v$.category.$model" label="Category" bg-color="white"
                            :items="categories" :error="v$.category.$error" :error-messages="errors.category" />
                    </v-col>
                </v-row> -->
                <v-btn type="submit" class="submit-btn" color="green" icon="mdi-pen-plus" size="small"></v-btn>

            </v-form>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.v-card {
    box-shadow: none;
    border-color: white !important;
}

.select-category {
    width: 70%;
}


.select-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

.submit-btn {
    margin-bottom: 2%;
}
</style>