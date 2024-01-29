<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { client } from '@/services/OpenAPIClient';
import type { Task } from '@/types/openapi'
import TaskItem from '@/components/TaskItem.vue'
import TaskCreate from '@/components/TaskCreate.vue'

const tasks = ref([] as Task[])
const toggleCreateTask = ref(false)
const task = ref({} as Task)
const tabs = ref(1)
const currentBannerIcon = ref('mdi-calendar')
const tagFilter = ref('')
const searchInput = ref('')

const getTasks = async () => {
    await client['TaskController.find']().then((res) => {
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

const closeEdit = () => {
    toggleCreateTask.value = false
    task.value = {} as Task
    getTasks()
}

const deleteTask = (taskToDelete: Task) => {
    client['TaskController.deleteById'](taskToDelete.id).then(() => {
        getTasks()
    })
}

const toggleArchive = (taskToArchive: Task) => {
    taskToArchive.active = !taskToArchive.active
    client['TaskController.updateById'](taskToArchive.id, taskToArchive).then(() => {
        getTasks()
    })
}

const setBannerIcon = (mdiIcon: string) => {
    currentBannerIcon.value = mdiIcon
}

const getTasksToDisplay = (tagsToMatch: string) => {
    const lowercaseTagsToMatch = tagsToMatch.toLowerCase();

    let tasksToDisplay = tasks.value.filter(t => {
        const matchesTags = t.tags?.some(tag => tag.toLowerCase().includes(lowercaseTagsToMatch));
        const isActive = tabs.value === 1 ? t.active : !t.active;
        return tagFilter.value !== '' ? matchesTags && isActive : isActive;
    });

    return tasksToDisplay;
}

const tagFilterChanged = () => {
    tagFilter.value = searchInput.value
}

watch(() => searchInput.value, tagFilterChanged)

onBeforeMount(() => getTasks())
</script>

<template>
    <v-card class="mx-auto card" min-width="440" width="fit-content" max-height="600">

        <v-card-item class="bg-orange-darken-4">
            <v-card-title>
                <h4 v-if="!toggleCreateTask">ToDo</h4>
                <h4 v-if="toggleCreateTask">Create</h4>
            </v-card-title>

            <template v-slot:append>
                <v-btn v-if="!toggleCreateTask" color="white" icon="mdi-plus" size="small"
                    @click="handleToggleCreateTask"></v-btn>
                <v-btn v-else color="white" icon="mdi-arrow-right" size="small" @click="handleToggleCreateTask"></v-btn>
            </template>
        </v-card-item>

        <v-container class="card-content">
            <TaskCreate v-if="toggleCreateTask" @set-tasks="getTasks" @close-edit="closeEdit" :item="task" />

            <v-container v-if="!toggleCreateTask">
                <v-card class="mx-auto banner" width="400" :prepend-icon="currentBannerIcon">
                    <template v-slot:title>
                        <h4 v-if="tabs == 1">Active Tasks</h4>
                        <h4 v-if="tabs == 2">Archived Tasks</h4>
                    </template>
                </v-card>

                <v-virtual-scroll :items="getTasksToDisplay(tagFilter)" min-height="200" max-height="250" item-height="20">
                    <template v-slot:default="{ item }">
                        <TaskItem :item="item" @set-edit-task="editTask" @set-delete-task="deleteTask"
                            @set-archive-task="toggleArchive" />
                    </template>
                </v-virtual-scroll>
            </v-container>
        </v-container>

        <v-container v-if="!toggleCreateTask" class="tab-container">
            <v-text-field v-model="searchInput" bg-color="white" solo label="Search by tag"
                prepend-inner-icon="mdi-tag-search"></v-text-field>

            <v-tabs v-model="tabs" color="orange" grow>
                <v-tab :value="1" @click="setBannerIcon('mdi-calendar')">
                    <v-icon>mdi-calendar-today</v-icon>
                </v-tab>

                <v-tab :value="2" @click="setBannerIcon('mdi-archive')">
                    <v-icon>mdi-archive</v-icon>
                </v-tab>

            </v-tabs>
        </v-container>
    </v-card>
</template> 

<style scoped>
.card {
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
}

.card-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    width: 100%;
}

.banner {
    border-radius: 20px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 5%;
    width: 100% !important;
}

.tab-container {
    position: sticky;
    bottom: 0;
    z-index: 2;
}
</style>