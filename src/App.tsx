import { useState } from "react";
import Header from "./components/Header.tsx";
import "./App.css";

function generateGrid(gridSize: number): boolean[][] {
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

function App() {
  const [board, setBoard] = useState(generateGrid(10));
  console.log(board);

  function handleCellClick(rowIndex: number, cellIndex: number) {
    const copyBoard = structuredClone(board);
    copyBoard[rowIndex][cellIndex] = !board[rowIndex][cellIndex];
    setBoard(copyBoard);
  }

  return (
    <>
      <Header />
      <table className="table">
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>
                <button
                  className="button"
                  onClick={() => handleCellClick(rowIndex, cellIndex)}
                >
                  {cell ? "O" : "X"}
                </button>
              </td>
            ))}
          </tr>
        ))}
      </table>
      <button>Next</button>
    </>
  );
}

export default App;
