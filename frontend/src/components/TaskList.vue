<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { client } from '@/services/OpenAPIClient';
import type { Task } from '@/types/openapi'

const tasks = ref([] as Task[])

const setTasks = () => {
    client['TaskController.find']().then((res) => {
        tasks.value = res.data as Task[]
    })
}

onBeforeMount(() => setTasks())

</script>

<template>
    <v-card class="mx-auto" max-width="400">
        <v-card-item class="bg-orange-darken-4">
            <v-card-title>
                User Directory
            </v-card-title>

            <template v-slot:append>
                <v-btn color="white" icon="mdi-plus" size="small"></v-btn>
            </template>
        </v-card-item>

        <v-card-text class="pt-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi nobis a at voluptates culpa optio amet!
            Inventore deserunt voluptatem maxime a veniam placeat, eos impedit nulla quos? Officiis, aperiam ducimus.
        </v-card-text>

        <v-divider></v-divider>

        <v-virtual-scroll :items="tasks" height="300" item-height="50">
            <template v-slot:default="{ item }">
                <v-list-item :title="`${item.description}`">
                    <v-list-item-subtitle>
                        <span class="tag-chip"
                            v-for="(tag, index) in (item.tags || '').toString().split(',').map(t => `#${t.trim()}`)"
                            :key="index">
                            {{ tag }}
                        </span>
                    </v-list-item-subtitle>
                    <template v-slot:prepend>
                        <v-icon class="">mdi-clipboard</v-icon>
                    </template>

                    <template v-slot:append>
                        <v-btn icon="mdi-pencil" size="x-small" variant="tonal"></v-btn>
                    </template>
                </v-list-item>
            </template>
        </v-virtual-scroll>
    </v-card>
</template>

<style scoped>
.tag-chip {
    background: linear-gradient(45deg, #0022ff, #e52e71);
    color: white;
    margin-right: 2%;
    padding: 2%;
    width: fit-content;
}
</style>