<script setup lang="ts">
import { ref } from 'vue'
import { checkWinner } from '../../lib/matrix-winner-decider'

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
    winnerCells.value = getWinnerCells()
}

const getWinnerCells = () => {
    const result = checkWinner(matrix.value, players, consecutiveOcurrences)
    return result !== false ? result : []
}

const winnerCells = ref(getWinnerCells())

const isInWinnerCells = (row: number, col: number) => {
    return winnerCells.value.map(cell => JSON.stringify(cell)).includes(JSON.stringify([row, col]))
}
</script>

<template>
    <div class="border border-slate-600" :key="matrixGeneratedAt">
        <div v-for="row, rowIndex in matrix" :key="rowIndex" class="flex">
            <div v-for="col, colIndex in row" :key="col" class="flex flex-col items-center justify-center border border-slate-600 w-10 h-10 leading-none" :class= "isInWinnerCells(rowIndex, colIndex) ? 'bg-lime-300' : 'bg-cyan-100'">
                {{ col ?? '&nbsp;' }}
                <span class="text-2xs align-bottom">{{ [rowIndex, colIndex] }}</span>
            </div>
        </div>
    </div>
    <button class="rounded-full bg-slate-600 text-white px-4 py-1.5 cursor-pointer hover:bg-slate-500" @click="regenerateMatrix">Regenerate matrix</button>
    <div>Do we have winner? {{ winnerCells.length ? 'Yes! 🍾' : 'Nope 🤦' }}</div>
</template>
