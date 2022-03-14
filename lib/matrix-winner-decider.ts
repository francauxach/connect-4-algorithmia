export function findByHorizontal(matrix, players, consecutiveOcurrences, direction = 'horizontal') {
    let result = undefined

    for (let index = 0; index < matrix.length; index++) {
        const col = matrix[index]

        for (let indexPlayers = 0; indexPlayers < players.length; indexPlayers++) {
            const player = players[indexPlayers]

            if (col.join(undefined).includes([...Array(consecutiveOcurrences)].map(() => player).join(undefined))) {
                const winnerArrayIndex = col.map((cell, index) => {
                    return col.slice(index, consecutiveOcurrences + index).join(undefined) === [...Array(consecutiveOcurrences)].map(() => player).join(undefined)
                }).indexOf(true)

                result = col.map((cell, mapIndex) => {
                    let position = []

                    switch (direction) {
                        case 'vertical':
                            position = [mapIndex, matrix.indexOf(col)]
                            break
                        case 'horizontal':
                            position = [matrix.indexOf(col), mapIndex]
                        default:
                            break
                    }

                    return cell && cell === player && (mapIndex >= winnerArrayIndex && mapIndex < consecutiveOcurrences + winnerArrayIndex) ? position : false
                }).filter(Boolean)

                result.length = consecutiveOcurrences
                break
            }
        }

        if (result) {
            break
        }
    }

    return result ?? false
}

export function findByDiagonal(matrix, players, consecutiveOcurrences, reverse = false) {
    let result = undefined
    const flatMatrix = matrix.flatMap(row => row)
    const winnerCellsGap = matrix[0].length + (reverse ? -1 : 1)

    for (let indexPlayer = 0; indexPlayer < players.length; indexPlayer++) {
        const player = players[indexPlayer];

        for (let index = 0; index < flatMatrix.length; index++) {
            const possibleDiagonalPositions = [...Array(consecutiveOcurrences).keys()].map((key) => (key * winnerCellsGap) + index)
            const hasCorrectDiagonalPosition = possibleDiagonalPositions.every((value) => value < (matrix.length * matrix[0].length) && flatMatrix[value] === player)

            const possibleDiagonalColumns = possibleDiagonalPositions.map((value) => Math.floor(value / matrix[0].length))
            const hasCorrectDiagonalColumns = possibleDiagonalColumns.every((v, i) => i === 0 || v === possibleDiagonalColumns[i - 1] + 1)

            if (hasCorrectDiagonalPosition && hasCorrectDiagonalColumns) {
                result = possibleDiagonalPositions.map((value) => [Math.floor(value / matrix[0].length), value % matrix[0].length])
                break
            }
        }

        if (result) {
            break
        }
    }

    return result ?? false
}

export function checkWinner(matrixRef, players, consecutiveOcurrences) {
    const matrix: Array<any> = Array.from(matrixRef)
    let winnerFound = []

    if (matrix[0].length >= consecutiveOcurrences) {
        // Determine if X items consecutively equals horizontally
        winnerFound = findByHorizontal(matrix, players, consecutiveOcurrences)

        if (winnerFound.length) {
            return winnerFound
        }

        // Determine if X items consecutively equals vertically (transposing the matrix)
        const transposedMatrix = matrix[0].map((item, index) => matrix.map(item => item[index]))
        winnerFound = findByHorizontal(transposedMatrix, players, consecutiveOcurrences, 'vertical')

        if (winnerFound.length) {
            return winnerFound
        }

        if (matrix[0].length >= consecutiveOcurrences) {
            // Determine if X items consecutively equals diagonally (from left to right -> bottom)
            winnerFound = findByDiagonal(matrix, players, consecutiveOcurrences)

            if (winnerFound.length) {
                return winnerFound
            }

            // Determine if X items consecutively equals diagonally (from left to right -> top)
            winnerFound = findByDiagonal(matrix, players, consecutiveOcurrences, true)

            if (winnerFound.length) {
                return winnerFound
            }
        }
    }

    return false
}
