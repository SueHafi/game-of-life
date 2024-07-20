import { useEffect, useState } from "react";
import Header from "./components/Header.tsx";
import "./App.css";
import { getNextGen } from "./utils.ts";

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
  const [genCount, setGenCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = setInterval(progressToNextGen, 200);
    }
    return () => {
      if (isRunning) {
        clearInterval(intervalId);
      }
    };
  });

  function handleCellClick(rowIndex: number, cellIndex: number): void {
    const copyBoard = structuredClone(board);
    copyBoard[rowIndex][cellIndex] = !board[rowIndex][cellIndex];
    setBoard(copyBoard);
  }

  function progressToNextGen(): void {
    const newBoard = getNextGen(board);
    setBoard(newBoard);
    setGenCount(genCount + 1);
  }

  function handleNextButtonClick(): void {
    progressToNextGen();
  }

  function handleStartButtonClick(): void {
    setIsRunning(true);
  }
  function handlePauseButtonClick(): void {
    setIsRunning(false);
  }

  return (
    <>
      <Header />
      {genCount > 0 && <p>Gen count: {genCount}</p>}
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
      {isRunning ? (
        <button onClick={handlePauseButtonClick}>Pause</button>
      ) : (
        <button onClick={handleStartButtonClick}>Start</button>
      )}
      <button onClick={handleNextButtonClick}>Next</button>
    </>
  );
}

export default App;
