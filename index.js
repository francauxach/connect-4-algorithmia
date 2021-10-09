// Problem to solve --> Given a 6x7 matrix, determine if 4 items are consecutive horizontally, vertically and diagonally

// Empty matrix
// [
//     [null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null],
// ]

// General variables
const cols = 7
const rows = 6
const consecutiveOcurrences = 4
const players = ['A', 'B']

// Generate the matrix / gameboard
const matrix = [...Array(rows)].map(() => [...Array(cols)].map(() => players[Math.floor(Math.random() + (1/2))]))
console.table(matrix)

// Determine if X items consecutively equals horizontally
const horizontallyMap = matrix.map((col) => col.join('').includes([...Array(consecutiveOcurrences)].map(() => 'A').join('')) || col.join('').includes([...Array(consecutiveOcurrences)].map(() => 'B').join('')))
console.log(horizontallyMap)

// Determine if X items consecutively equals vertically (transposing the matrix)
const transposedMatrix = matrix[0].map((item, index) => matrix.map(item => item[index]))
const verticallyMap = transposedMatrix.map((col) => col.join('').includes([...Array(consecutiveOcurrences)].map(() => 'A').join('')) || col.join('').includes([...Array(consecutiveOcurrences)].map(() => 'B').join('')))
console.log(verticallyMap)

// Determine if X items consecutively equals diagonally (to bottom)


// Determine if X items consecutively equals diagonally (to top)
