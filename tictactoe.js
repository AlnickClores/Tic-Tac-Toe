import { useState } from "react";

const Square = (props) => {
  return (
    <>
      <button className="square" onClick={props.handleClick}>
        {props.value}
      </button>
    </>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handlePlayerClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "0";
    setXIsNext(!xIsNext);
    setSquares(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every((square) => square !== null)) {
    status = "It's a tie!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <h1>Tic-Tac-Toe Game</h1>
      {status}
      <div className="board-row">
        <Square value={squares[0]} handleClick={() => handlePlayerClick(0)} />
        <Square value={squares[1]} handleClick={() => handlePlayerClick(1)} />
        <Square value={squares[2]} handleClick={() => handlePlayerClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} handleClick={() => handlePlayerClick(3)} />
        <Square value={squares[4]} handleClick={() => handlePlayerClick(4)} />
        <Square value={squares[5]} handleClick={() => handlePlayerClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} handleClick={() => handlePlayerClick(6)} />
        <Square value={squares[7]} handleClick={() => handlePlayerClick(7)} />
        <Square value={squares[8]} handleClick={() => handlePlayerClick(8)} />
      </div>
    </>
  );
}
