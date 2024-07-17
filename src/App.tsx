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

  return (
    <>
      <Header />
      <table className="table">
        {board.map((row, i) => (
          <tr key={i}>
            {row.map((cell, i) => (
              <td key={i}>{cell ? "O" : "X"}</td>
            ))}
          </tr>
        ))}
      </table>
    </>
  );
}

export default App;
