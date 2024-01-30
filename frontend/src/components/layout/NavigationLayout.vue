<script setup lang="ts">
import TaskList from '@/components/task/TaskList.vue';
</script>

<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer theme="dark" permanent>
                <v-list color="transparent">
                    <v-list-item prepend-icon="mdi-clipboard-outline" title="My Tasks"></v-list-item>
                </v-list>

                <template v-slot:append>
                    <div class="pa-2">
                        <v-btn block>
                            Todo APP
                        </v-btn>
                    </div>
                </template>

            </v-navigation-drawer>
            <v-main style="height: 400px">
                <TaskList />
            </v-main>
        </v-layout>
    </v-card>
</template>

<style scoped>
.v-main {
    background-color: #f5f5f5;
    height: 100vh !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.v-navigation-drawer {
    background: #e65100;
}
</style>