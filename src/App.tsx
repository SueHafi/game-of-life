import { useEffect, useState } from "react";
import Header from "./components/Header.tsx";
import "./App.css";
import {
  Board,
  applyKickbackPattern,
  getNextGen,
  generateBoard,
} from "./board.ts";
import { boardSize } from "./config.ts";

function generateNewBoard(): Board {
  const board = generateBoard(boardSize);
  const boardWithPattern = applyKickbackPattern(board);
  return boardWithPattern;
}

function App() {
  const [board, setBoard] = useState(generateNewBoard());
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

  function handleClearButtonClick(): void {
    setIsRunning(false);
    setBoard(generateNewBoard());
    setGenCount(0);
  }

  return (
    <>
      <Header genCount={genCount} />
      <table className="table">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <button
                    className={`block ${cell ? "block--is-alive" : ""}`}
                    onClick={() => handleCellClick(rowIndex, cellIndex)}
                  >
                    <span className="sr-only">{cell ? "Alive" : "Dead"}</span>
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons-container">
        {isRunning ? (
          <button
            className="button start-pause-button pause-button"
            onClick={handlePauseButtonClick}
          >
            Pause
          </button>
        ) : (
          <button
            className="button start-pause-button"
            onClick={handleStartButtonClick}
          >
            Start
          </button>
        )}
        <button className="button next-button" onClick={handleNextButtonClick}>
          Next
        </button>
        <button
          className="button clear-button"
          onClick={handleClearButtonClick}
        >
          Clear
        </button>
      </div>
      <footer className="footer">
        &copy; by Sue Hafizoglu | See code at{" "}
        <a href="https://github.com/SueHafi/game-of-life" target="_blank">
          GitHub
        </a>
      </footer>
    </>
  );
}

export default App;
