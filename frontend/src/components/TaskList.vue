<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { client } from '@/services/OpenAPIClient';
import type { Task } from '@/types/openapi'
import TaskItem from '@/components/TaskItem.vue'
import TaskCreate from '@/components/TaskCreate.vue'

const tasks = ref([] as Task[])
const toggleCreateTask = ref(false)
const task = ref({} as Task)

const setTasks = () => {
    client['TaskController.find']().then((res) => {
        tasks.value = res.data as Task[]
    })
}

const handleToggleCreateTask = () => {
    toggleCreateTask.value = !toggleCreateTask.value
    task.value = {} as Task
}

const editTask = (taskToEdit: Task) => {
    toggleCreateTask.value = true
    task.value = taskToEdit
}

onBeforeMount(() => setTasks())
</script>

<template>
    <v-card class="mx-auto card" width="450">

        <v-card-item class="bg-orange-darken-4">
            <v-card-title>
                <h4 v-if="!toggleCreateTask">ToDo</h4>
                <h4 v-if="toggleCreateTask">Create</h4>
            </v-card-title>

            <template v-slot:append>
                <v-btn v-if="!toggleCreateTask" color="white" icon="mdi-plus" size="small"
                    @click="handleToggleCreateTask"></v-btn>
                <v-btn v-else color="white" icon="mdi-arrow" size="small" @click="handleToggleCreateTask"></v-btn>
            </template>

        </v-card-item>

        <v-container class="card-content">
            <TaskCreate v-if="toggleCreateTask" @set-tasks="setTasks" :item="task" />

            <v-container v-if="!toggleCreateTask">
                <v-card class="mx-auto banner" width="400" prepend-icon="mdi-calendar">
                    <template v-slot:title>
                        <h4>Active Tasks</h4>
                    </template>
                </v-card>

                <v-virtual-scroll :items="tasks" min-height="200" max-height="300" height="100%" item-height="20">
                    <template v-slot:default="{ item }">
                        <TaskItem :item="item" @set-edit-task="editTask" />
                    </template>
                </v-virtual-scroll>
            </v-container>

        </v-container>

    </v-card>
</template>

<style scoped>
.card-content {
    padding: 3%;
    display: flex;
    flex-direction: column;
    place-content: center;
    height: 100%;
    width: 100%;
}

.banner {
    background-color: #f5f5f5;
    place-content: center;
    margin-bottom: 4%;
    margin-top: -10%;
}
</style>