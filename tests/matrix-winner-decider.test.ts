import { describe, expect, it } from 'vitest'
import { findByHorizontal, findByDiagonal, checkWinner } from '../lib/matrix-winner-decider'

const players = ['X', 'O'];

describe('findByHorizontal (square)', () => {
    const consecutiveOcurrences = 3;
    const passingMatrix = [
        ['X', 'X', 'X'],
        [undefined, 'O', undefined],
        [undefined, 'O', 'O']
    ];
    const notPassingMatrix = [
        ['X', undefined, undefined],
        ['X', 'O', undefined],
        ['X', 'O', 'O']
    ];

    it('should find by horizontal and return the positions', () => {
        expect(findByHorizontal(passingMatrix, players, consecutiveOcurrences)).toEqual([
            [0, 0],
            [0, 1],
            [0, 2],
        ])
    })

    it('should find by vertical and return the positions', () => {
        expect(findByHorizontal(passingMatrix, players, consecutiveOcurrences, 'vertical')).toEqual([
            [0, 0],
            [1, 0],
            [2, 0],
        ])
    })

    it('should not find by horizontal and returns false', () => {
        expect(findByHorizontal(notPassingMatrix, players, consecutiveOcurrences)).toEqual(false)
    })
})

describe('findByDiagonal (square)', () => {
    const consecutiveOcurrences = 3;
    const passingMatrix = [
        ['O', 'X', 'X'],
        [undefined, 'O', undefined],
        [undefined, 'X', 'O']
    ];
    const passingReverseMatrix = [
        ['O', 'O', 'X'],
        [undefined, 'X', undefined],
        ['X', 'X', 'O']
    ];
    const notPassingMatrix = [
        ['X', undefined, undefined],
        ['O', 'O', undefined],
        ['X', 'X', 'O']
    ];

    it('should find by diagonal and return the positions', () => {
        expect(findByDiagonal(passingMatrix, players, consecutiveOcurrences)).toEqual([
            [0, 0],
            [1, 1],
            [2, 2],
        ])
    })

    it('should find by diagonal and return the positions', () => {
        expect(findByDiagonal(passingReverseMatrix, players, consecutiveOcurrences, true)).toEqual([
            [0, 2],
            [1, 1],
            [2, 0],
        ])
    })

    it('should not find by diagonal and returns false', () => {
        expect(findByDiagonal(notPassingMatrix, players, consecutiveOcurrences)).toEqual(false)
    })
})

describe('checkWinner (square)', () => {
    const consecutiveOcurrences = 3;
    const passingMatrix = [
        ['X', undefined, undefined],
        ['X', 'O', undefined],
        ['X', 'O', 'O']
    ];
    const notPassingMatrix = [
        ['X', undefined, undefined],
        ['O', 'X', undefined],
        ['X', 'O', 'O']
    ];

    it('should found the winner and return the positions', () => {
        expect(checkWinner(passingMatrix, players, consecutiveOcurrences)).toEqual([
            [0, 0],
            [1, 0],
            [2, 0],
        ])
    })

    it('should not found a winner and return false', () => {
        expect(checkWinner(notPassingMatrix, players, consecutiveOcurrences)).toEqual(false)
    })
})

describe('findByHorizontal (not square)', () => {
    const consecutiveOcurrences = 3;
    const passingMatrix = [
        ['X', 'X', 'X', undefined],
        [undefined, 'O', undefined, undefined],
        [undefined, 'O', 'O', undefined]
    ];
    const notPassingMatrix = [
        ['X', undefined, undefined, undefined],
        ['X', 'O', undefined, undefined],
        ['X', 'O', 'O', undefined]
    ];

    it('should find by horizontal and return the positions', () => {
        expect(findByHorizontal(passingMatrix, players, consecutiveOcurrences)).toEqual([
            [0, 0],
            [0, 1],
            [0, 2],
        ])
    })

    it('should not find by horizontal and returns false', () => {
        expect(findByHorizontal(notPassingMatrix, players, consecutiveOcurrences)).toEqual(false)
    })
})

describe('findByDiagonal (not square)', () => {
    const consecutiveOcurrences = 3;
    const passingMatrix = [
        ['O', 'X', 'X', undefined],
        [undefined, 'O', undefined, undefined],
        [undefined, 'X', 'O', undefined]
    ];
    const notPassingMatrix = [
        ['X', undefined, undefined, undefined],
        ['O', 'O', undefined, undefined],
        ['X', 'X', 'O', undefined]
    ];

    it('should find by diagonal and return the positions', () => {
        expect(findByDiagonal(passingMatrix, players, consecutiveOcurrences)).toEqual([
            [0, 0],
            [1, 1],
            [2, 2],
        ])
    })

    it('should not find by diagonal and returns false', () => {
        expect(findByDiagonal(notPassingMatrix, players, consecutiveOcurrences)).toEqual(false)
    })
})

describe('checkWinner (not square)', () => {
    const consecutiveOcurrences = 3;
    const passingMatrix = [
        ['X', undefined, 'O', undefined],
        ['X', 'O', 'X', undefined],
        ['O', undefined, 'O', undefined]
    ];
    const notPassingMatrix = [
        ['X', undefined, undefined, undefined],
        ['O', 'X', undefined, undefined],
        ['X', 'O', 'O', undefined]
    ];

    it('should found the winner and return the positions', () => {
        expect(checkWinner(passingMatrix, players, consecutiveOcurrences)).toEqual([
            [0, 2],
            [1, 1],
            [2, 0],
        ])
    })

    it('should not found a winner and return false', () => {
        expect(checkWinner(notPassingMatrix, players, consecutiveOcurrences)).toEqual(false)
    })
})
