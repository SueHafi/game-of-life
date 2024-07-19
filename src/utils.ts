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
      // we have our rowIndex and our cellIndex. We have a specific cell.
      // count neighbours
      let neighbourCount = countNeighbours(
        rowIndex,
        rowCount,
        colIndex,
        colCount,
        board
      );

      // top-left neighbour
      if (
        rowIndex !== 0 &&
        colIndex !== 0 &&
        board[rowIndex - 1][colIndex - 1]
      ) {
        neighbourCount++;
      }

      // top neighbour
      if (rowIndex !== 0 && board[rowIndex - 1][colIndex]) {
        neighbourCount++;
      }

      // top right neighbour
      if (
        rowIndex !== 0 &&
        colIndex !== row.length - 1 &&
        board[rowIndex - 1][colIndex + 1]
      ) {
        neighbourCount++;
      }

      //middle left neighbour
      if (colIndex !== 0 && board[rowIndex][colIndex - 1]) {
        neighbourCount++;
      }

      //middle right neighbour
      if (colIndex !== row.length - 1 && board[rowIndex][colIndex + 1]) {
        neighbourCount++;
      }

      //bottom left neighbour
      if (
        rowIndex !== board.length - 1 &&
        colIndex !== 0 &&
        board[rowIndex + 1][colIndex - 1]
      ) {
        neighbourCount++;
      }

      //bottom neightbour
      if (rowIndex !== board.length - 1 && board[rowIndex - 1][colIndex - 1]) {
        neighbourCount++;
      }

      //bottom right neighbour
      if (
        rowIndex !== board.length - 1 &&
        colIndex !== row.length - 1 &&
        board[rowIndex + 1][colIndex + 1]
      ) {
        neighbourCount++;
      }
    }
    if (row.includes(true)) {
      return [[false]];
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
