<script setup lang="ts">

const colors = ['#448AFF', '#2979FF', '#2962FF']
const names = ['Oliver', 'Jake', 'Noah', 'James', 'Jack', 'Connor', 'Liam', 'John'];
const items = [
    {
        fullName: 'John Doe',
        initials: 'JD',
        color: colors[Math.floor(Math.random() * colors.length)]
    },
]

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

        <v-virtual-scroll :items="items" height="300" item-height="50">
            <template v-slot:default="{ item }">
                <v-list-item :title="`Comprar papas`" :subtitle="`Badge #${item}`">
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