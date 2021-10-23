import { checkWinner } from '../dist'

// Set the configs
const cols = 7
const rows = 6
const players = ['A', 'B']
const consecutiveOcurrences = 4

// Create the matrix
const matrix = [...Array(rows)].map(() => [...Array(cols)].map(() => players[Math.floor(Math.random() + (1/2))]))
console.table(matrix)

console.log('Do we have winner? ', checkWinner(matrix, players, consecutiveOcurrences))