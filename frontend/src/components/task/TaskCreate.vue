<script setup lang="ts">
import { computed, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useValidationErrors } from '@/helpers/validation-errors'
import { FORM_REQUIRED_FIELD } from '@/helpers/messages'
import { client } from '@/services/OpenAPIClient';
import type { TaskForm } from '@/types/task-form'
import type { Task } from '@/types/openapi'
import SnackAlert from '@/components/layout/SnackAlert.vue'

const props = defineProps({
    item: {
        type: Object as () => Task,
        required: false
    }
})

const toggleAlert = ref(false)

const form = ref<TaskForm>({
    description: props.item?.description || '',
    category: ''
})

const rules = {
    description: {
        required: helpers.withMessage(FORM_REQUIRED_FIELD, required)
    },
    category: {}
}

const v$ = useVuelidate(rules, form)

const errors = computed(() => useValidationErrors<any>(v$.value.$errors))

const categories = [
    'Food', 'Work', 'Study', 'Sport', 'Other'
]

const addedTags = ref<string[]>(props.item?.tags || [])

const addTag = () => {
    if (form.value.category === '' || addedTags.value.includes(form.value.category)) return
    if (addedTags.value.length === 3) return
    addedTags.value.push(form.value.category)
    form.value.category = ''
}

const clearTags = () => {
    addedTags.value = []
}

const emit = defineEmits(['setTasks', 'closeEdit'])


const handleSubmit = async () => {
    const result = await v$.value.$validate()
    if (!result) return

    let task: Task = {
        description: form.value.description,
        tags: addedTags.value,
        active: true,
    }

    form.value.description = ''
    addedTags.value = []
    v$.value.$reset()

    if (props.item?.id) {
        task.id = props.item.id
        await updateTask(task)
        emit('closeEdit')

    } else {
        await createTask(task)
        toggleAlert.value = true
        setTimeout(() => {
            toggleAlert.value = false
        }, 3000)
        emit('setTasks')
    }
}

const createTask = async (task: Task) => {
    await client['TaskController.create'](null, task)
}

const updateTask = async (task: Task) => {
    await client['TaskController.updateById'](task.id, task)
}


</script>

<template>
    <v-card class="mx-auto create-card" min-width="100%" width="100%" prepend-icon="mdi-calendar">
        <template v-slot:title>
            <h4 v-if="!props.item?.id">New Task</h4>
            <h4 v-else>Edit Task</h4>
        </template>

        <v-card-text>
            <v-form @submit.prevent="handleSubmit" class="form">
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="v$.description.$model" label="Task description" bg-color="white"
                            :error="v$.description.$error" :error-messages="errors.description" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="select-row" cols="12">
                        <v-select class="select-category" v-model="v$.category.$model" label="Category" bg-color="white"
                            :items="categories" :error="v$.category.$error" :error-messages="errors.category" />
                    </v-col>
                </v-row>

                <v-row class="categories">
                    <v-col v-if="addedTags.length > 0" cols="12">
                        <span class="tag-chip"
                            v-for="(tag, index) in (addedTags || '').toString().split(',').map(t => `#${t.trim()}`)"
                            :key="index">
                            {{ tag }}
                        </span>
                    </v-col>
                    <v-col v-else cols="12">
                        <span class="hidden"></span>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="buttons" cols="12">
                        <div class="tags-buttons"> <v-btn @click="addTag" class="tag-button" append-icon="mdi-tag">
                                Tag
                            </v-btn>
                            <v-btn @click="clearTags" class="tag-button">
                                <v-icon>mdi-spray-bottle</v-icon>
                            </v-btn>
                        </div>

                        <v-btn class="accept-button" color="blue-darken-3" type="submit"
                            append-icon="mdi-checkbox-marked-circle">
                            OK
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>

    <SnackAlert v-if="toggleAlert" :title="'Task created successfully!'" :alertType="{ type: 'success' }" />
</template>

<style scoped>
.v-card {
    box-shadow: none;
    border-color: white !important;
}

.select-category {
    width: 100%;
}

.select-row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

.accept-button {
    background: linear-gradient(45deg, #eb7944, #e52e71);
    color: white;
}

.tag-button {
    background: linear-gradient(45deg, #329d8f, #2780d8);
    color: white;
}

.tags-buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.buttons {
    display: flex;
    justify-content: space-between;
}

.categories {
    margin-top: 20px;
    margin-bottom: 20px;
}

.tag-chip {
    background: linear-gradient(45deg, #eb7944, #e52e71);
    color: white;
    width: fit-content;
    border-radius: 12px;
    padding: 4px;
    margin: 5px;
    font-size: small;
}

.create-card {
    margin-top: 20px !important;
}

.hidden {
    color: white;
    width: fit-content;
    border-radius: 12px;
    padding: 4px;
    margin: 5px;
    font-size: small;
}
</style>