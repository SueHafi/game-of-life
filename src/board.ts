export type Board = boolean[][];

export function generateBoard(gridSize: number): Board {
  const grid = [];
  for (let i = 0; i < gridSize; i++) {
    const row = [];
    for (let j = 0; j < gridSize; j++) {
      const cell = false;
      row.push(cell);
    }
    grid.push(row);
  }
  return grid;
}

export function applyKickbackPattern(board: Board): Board {
  const clonedBoard = structuredClone(board);
  const rowCount = board.length;
  const colCount = board[0].length;
  const centreRow = Math.floor(rowCount / 2);
  const centreCol = Math.floor(colCount / 2);
  clonedBoard[centreRow - 3][centreCol] = true;
  clonedBoard[centreRow - 2][centreCol - 1] = true;
  clonedBoard[centreRow - 1][centreCol - 1] = true;
  clonedBoard[centreRow - 1][centreCol] = true;
  clonedBoard[centreRow - 1][centreCol + 1] = true;
  return clonedBoard;
}

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
        board,
        rowIndex,
        rowCount,
        colIndex,
        colCount
      );

      const isAlive = board[rowIndex][colIndex];

      if ((isAlive && neighbourCount === 2) || neighbourCount === 3) {
        clonedBoard[rowIndex][colIndex] = true;
      } else if (!isAlive && neighbourCount === 3) {
        clonedBoard[rowIndex][colIndex] = true;
      } else {
        clonedBoard[rowIndex][colIndex] = false;
      }
    }
  }
  return clonedBoard;
}

function countNeighbours(
  board: boolean[][],
  rowIndex: number,
  rowCount: number,
  colIndex: number,
  colCount: number
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
