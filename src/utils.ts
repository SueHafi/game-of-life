export function getNextGen(board: boolean[][]): boolean[][] {
  if (board[0].length === 0) {
    throw new Error("Board rows must have cells");
  }

  const clonedBoard = structuredClone(board);

  const rowCount = board.length;
  const colCount = board[0].length;

  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    const row = board[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const neighbourCount = countNeighbours(
        rowIndex,
        rowCount,
        colIndex,
        colCount,
        board
      );
      if (board[rowIndex][colIndex] && neighbourCount === 3) {
        clonedBoard[rowIndex][colIndex] = true;
      } else {
        clonedBoard[rowIndex][colIndex] = false;
      }
    }
  }
  return clonedBoard;
}

function countNeighbours(
  rowIndex: number,
  rowCount: number,
  colIndex: number,
  colCount: number,
  board: boolean[][]
) {
  let neighbourCount = 0;

  for (let rowDiff = -1; rowDiff <= 1; rowDiff++) {
    for (let colDiff = -1; colDiff <= 1; colDiff++) {
      if (
        !(rowDiff === 0 && colDiff === 0) &&
        0 <= rowIndex + rowDiff &&
        rowIndex + rowDiff < rowCount &&
        0 <= colIndex + colDiff &&
        colIndex + colDiff < colCount &&
        board[rowIndex + rowDiff][colIndex + colDiff]
      ) {
        neighbourCount++;
      }
    }
  }
  return neighbourCount;
}
