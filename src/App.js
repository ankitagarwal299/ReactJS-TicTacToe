import { useState } from "react";

import "./styles.css";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function Square({ value, onSquareClick }) {
  return (
    <>
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>

      {/* <div className="square" onClick={onSquareClick}>
        {value}
      </div> */}
    </>
  );
}

export function Board({ squares, xIsNext, onPlay }) {
  function onSquareClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    let newSquare = squares.slice();

    if (xIsNext) {
      newSquare[i] = "X";
    } else {
      newSquare[i] = "O";
    }

    onPlay(newSquare);
  }

  // This is to display Game Status
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="container">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => onSquareClick(0)} />
          <Square value={squares[1]} onSquareClick={() => onSquareClick(1)} />
          <Square value={squares[2]} onSquareClick={() => onSquareClick(2)} />
        </div>

        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => onSquareClick(3)} />
          <Square value={squares[4]} onSquareClick={() => onSquareClick(4)} />
          <Square value={squares[5]} onSquareClick={() => onSquareClick(5)} />
        </div>

        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => onSquareClick(6)} />
          <Square value={squares[7]} onSquareClick={() => onSquareClick(7)} />
          <Square value={squares[8]} onSquareClick={() => onSquareClick(8)} />
        </div>
      </div>
    </>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]); //stack
  const [currentMove, setCurrentMove] = useState(0);

  // let currentSquares = history[history.length - 1];
  let currentSquares = history[currentMove]; //render the currently selected move, instead of always rendering the final move:

  function handlePlay(nextSquares) {
    const nextHistory = [...history, nextSquares];
    setHistory(nextHistory);

    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    //ToDo
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, index) => {
    let description;

    if (index > 0) {
      description = "Go to move #" + index;
    } else {
      description = "Go to game start #";
    }

    return (
      <li>
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="App">
      <Board
        xIsNext={xIsNext}
        onPlay={handlePlay}
        squares={currentSquares}
      ></Board>

      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
