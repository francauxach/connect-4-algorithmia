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
// console.log(horizontallyMap)

// Determine if X items consecutively equals vertically (transposing the matrix)
const transposedMatrix = matrix[0].map((item, index) => matrix.map(item => item[index]))
const verticallyMap = transposedMatrix.map((col) => col.join('').includes([...Array(consecutiveOcurrences)].map(() => 'A').join('')) || col.join('').includes([...Array(consecutiveOcurrences)].map(() => 'B').join('')))
// console.log(verticallyMap)

// Determine if X items consecutively equals diagonally (from left to right -> bottom)
// Discard some diagonals by consecutiveOcurrences number
const maxColsToSearchDiagonal = Math.round(cols / 2)
const maxRowsToSearchDiagonal = Math.round(rows / 2)
const diagonalsToBottom = []
const diagonalsToRight = []

for (let index = 0; index < maxRowsToSearchDiagonal; index++) {
    const arrayValues = []

    for (let indexRows = index; indexRows < rows; indexRows++) {
        const diagonalValues = []

        for (let indexCols = (indexRows - index); indexCols < cols; indexCols++) {
            diagonalValues.push(matrix[indexRows][indexCols])
        }

        if (diagonalValues.length) {
            arrayValues.push(diagonalValues.join('')[0])
        }
    }
    
    diagonalsToBottom.push(arrayValues)
}

for (let index = 1; index < maxColsToSearchDiagonal; index++) {
    const arrayValues = []

    for (let indexRows = 0; indexRows < rows; indexRows++) {
        const diagonalValues = []
    
        for (let indexCols = (indexRows + index); indexCols < cols; indexCols++) {
            diagonalValues.push(matrix[indexRows][indexCols])
        }

        if (diagonalValues.length) {
            arrayValues.push(diagonalValues.join('')[0])
        }
    }

    diagonalsToRight.push(arrayValues)
}

// Concat both diagonals
const diagonalsMatrix = diagonalsToBottom.concat(diagonalsToRight)
// console.table(diagonalsMatrix)

// Result
const diagonallyMap = diagonalsMatrix.map((col) => col.join('').includes([...Array(consecutiveOcurrences)].map(() => 'A').join('')) || col.join('').includes([...Array(consecutiveOcurrences)].map(() => 'B').join('')))
// console.log(diagonallyMap)

// Determine if X items consecutively equals diagonally (from left to right -> top)
