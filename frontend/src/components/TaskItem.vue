<script setup lang="ts">
import type { Task } from '@/types/openapi'

const props = defineProps({
    item: {
        type: Object as () => Task,
        required: true
    }
})

const emit = defineEmits(['setEditTask'])

const handleEdit = () => {
    emit('setEditTask', props.item)
}

</script>

<template>
    <v-list-item :title="`${props.item.description}`">
        <v-list-item-subtitle>
            <span class="tag-chip" v-for="(tag, index) in (item.tags || '').toString().split(',').map(t => `#${t.trim()}`)"
                :key="index">
                {{ tag }}
            </span>
        </v-list-item-subtitle>
        <template v-slot:prepend>
            <v-icon class="">mdi-clipboard</v-icon>
        </template>

        <template v-slot:append>
            <v-btn @click="handleEdit" icon="mdi-pencil" size="x-small" variant="tonal"></v-btn>
        </template>
    </v-list-item>
</template>

<style scoped>
.tag-chip {
    background: linear-gradient(45deg, #ff4204, #ef0a5e);
    color: white;
    margin-right: 2%;
    padding: 2%;
    width: fit-content;
}
</style>
