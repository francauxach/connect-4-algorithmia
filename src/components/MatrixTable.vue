<script setup lang="ts">
import { ref } from 'vue'
import { checkWinner } from '../../dist/matrix-winner-decider.es.js'

const cols = 7
const rows = 6
const players = ['A', 'B']
const consecutiveOcurrences = 4
const matrixGeneratedAt = ref(Date.now())
// Create the matrix
const matrix = ref(generateMatrix(rows, cols, players))

function generateMatrix(rows: number, cols: number, players: string[]): string[][] {
    return [...Array(rows)].map(() => [...Array(cols)].map(() => players[Math.floor(Math.random() + (1/2))]))
}

function regenerateMatrix(): void {
    matrix.value = generateMatrix(rows, cols, players)
    matrixGeneratedAt.value = Date.now()
}
</script>

<template>
    <div class="border" :key="matrixGeneratedAt">
        <div v-for="row, index in matrix" :key="index" class="flex">
            <div v-for="col in row" :key="col" class="flex items-center justify-center border w-10 h-10 leading-none">
                {{ col }}
            </div>
        </div>
    </div>
    <button class="rounded-full bg-slate-600 text-white px-4 py-1.5 cursor-pointer hover:bg-slate-500" @click="regenerateMatrix">Regenerate matrix</button>
    <div>Do we have winner? {{ checkWinner(matrix, players, consecutiveOcurrences) ? 'Yes! 🍾' : 'Nope 🤦' }}</div>
</template>
