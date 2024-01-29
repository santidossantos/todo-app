<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { client } from '@/services/OpenAPIClient';
import type { Task } from '@/types/openapi'
import TaskItem from '@/components/TaskItem.vue'
import TaskCreate from '@/components/TaskCreate.vue'
import { onUpdated } from 'vue';

const tasks = ref([] as Task[])

const setTasks = () => {
    client['TaskController.find']().then((res) => {
        tasks.value = res.data as Task[]
    })
}

onBeforeMount(() => setTasks())

onUpdated(() => setTasks())

</script>

<template>
    <v-card class="mx-auto card" width="430">

        <v-card-item class="bg-orange-darken-4">
            <v-card-title>
                ToDo
            </v-card-title>

            <template v-slot:append>
                <v-btn color="white" icon="mdi-plus" size="small"></v-btn>
            </template>

        </v-card-item>

        <v-container class="card-content">
            <TaskCreate  />

            <v-virtual-scroll :items="tasks" height="250" item-height="50">
                <template v-slot:default="{ item }">
                    <TaskItem :item="item" />
                </template>
            </v-virtual-scroll>
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
</style>