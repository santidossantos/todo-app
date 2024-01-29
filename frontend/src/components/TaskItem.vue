<script setup lang="ts">
import type { Task } from '@/types/openapi'

const props = defineProps({
    item: {
        type: Object as () => Task,
        required: true
    }
})

const emit = defineEmits(['setEditTask', 'setDeleteTask', 'setArchiveTask'])

const handleEdit = () => {
    emit('setEditTask', props.item)
}

const handleDelete = () => {
    emit('setDeleteTask', props.item)
}

const handleArchive = () => {
    emit('setArchiveTask', props.item)
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
            <div class="actions">
                <v-btn @click="handleArchive" color="indigo" icon="mdi-archive" size="x-small" variant="tonal"></v-btn>
                <v-btn v-if="props.item.active" @click="handleEdit" icon="mdi-pencil" size="x-small"
                    variant="tonal"></v-btn>
                <v-btn @click="handleDelete" color="red" icon="mdi-delete" size="x-small" variant="tonal"></v-btn>
            </div>
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

.actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-left: 5%;
    margin-top: 10px;
}
</style>
