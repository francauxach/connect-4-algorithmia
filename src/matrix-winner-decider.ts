export function findByHorizontal(matrix, players, consecutiveOcurrences) {
    return matrix.map((col) => col.join('').includes([...Array(consecutiveOcurrences)].map(() => players[0]).join('')) || col.join('').includes([...Array(consecutiveOcurrences)].map(() => players[1]).join('')))
}

export function findByDiagonal(matrix, consecutiveOcurrences, reverse = false) {
    const cols = matrix[0].length
    const rows = matrix.length
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

        if (arrayValues.length >= consecutiveOcurrences) {
            diagonalsToBottom.push(arrayValues)
        }
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

        if (arrayValues.length >= consecutiveOcurrences) {
            diagonalsToRight.push(arrayValues)
        }
    }

    return diagonalsToBottom.concat(diagonalsToRight)
}

export function checkWinner(matrix, players, consecutiveOcurrences) {
    // Determine if X items consecutively equals horizontally
    const horizontallyMap = findByHorizontal(matrix, players, consecutiveOcurrences)
    // console.log(horizontallyMap)
    if (horizontallyMap.some((item) => item === true)) {
        return true
    }

    // Determine if X items consecutively equals vertically (transposing the matrix)
    const transposedMatrix = matrix[0].map((item, index) => matrix.map(item => item[index]))
    const verticallyMap = findByHorizontal(transposedMatrix, players, consecutiveOcurrences)
    // console.log(verticallyMap)
    if (verticallyMap.some((item) => item === true)) {
        return true
    }

    // Determine if X items consecutively equals diagonally (from left to right -> bottom)
    // Discard some diagonals by consecutiveOcurrences number
    // Concat both diagonals
    const diagonalsMatrix = findByDiagonal(matrix, consecutiveOcurrences)
    // console.table(diagonalsMatrix)

    // Result
    const diagonallyMap = findByHorizontal(diagonalsMatrix, players, consecutiveOcurrences)
    // console.log(diagonallyMap)
    if (diagonallyMap.some((item) => item === true)) {
        return true
    }

    // Determine if X items consecutively equals diagonally (from left to right -> top)
    const reversedMatrix = matrix.reverse()
    const reversedDiagonalsMatrix = findByDiagonal(reversedMatrix, consecutiveOcurrences, true)
    const reversedDiagonallyMap = findByHorizontal(reversedDiagonalsMatrix, players, consecutiveOcurrences)
    // console.log(reversedDiagonallyMap)

    if (reversedDiagonallyMap.some((item) => item === true)) {
        return true
    }

    return false
}