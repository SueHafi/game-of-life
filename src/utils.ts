
export function getNextGen(board: boolean[][]): boolean[][] {
    const clonedBoard = structuredClone(board);
    if(board[0].length === 0) {
        throw new Error('Board rows must have cells');
    }
    return clonedBoard;
}