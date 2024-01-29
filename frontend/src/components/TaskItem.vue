<script setup lang="ts">
import type { Task } from '@/types/openapi'

const props = defineProps({
    item: {
        type: Object as () => Task,
        required: true
    }
})

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
            <v-btn icon="mdi-pencil" size="x-small" variant="tonal"></v-btn>
        </template>
    </v-list-item>
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
