import React, { useState } from 'react';
import './Tictactoe.css';
import circle from './circle.png';
import cross from './cross.png';

const Tictactoe = () => {
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState(1);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null); // Track the winner (either 'o' or 'x')

  const checkWinner = () => {
    // Possible winning combinations
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
      [0, 4, 8], [2, 4, 6] // Diagonal
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        return data[a]; // Return the winner ('o' or 'x')
      }
    }

    return null; // No winner yet
  };

  const toggle = (e, ind) => {
    const newData = [...data];
    const currentWinner = checkWinner();
    if (currentWinner) {
      setWinner(currentWinner);
      setLock(true);
      return; // Lock the game once there's a winner
    } else if (newData.every(cell => cell !== "")) {
      // Check for a draw
      setWinner("draw");
      setLock(true); // Lock the game if it's a draw
     
    }
   

   
    const currentPlayer = count % 2 === 0 ? "o" : "x"; // Decide current player

    newData[ind] = currentPlayer;
    e.target.innerHTML = `<img src='${currentPlayer === "o" ? circle : cross}' alt='${currentPlayer}'  />`;

    setData(newData);
    setCount(count + 1);

    // Check if the current move resulted in a win
   
  };

  const resetGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(1);
    setWinner(null);
    setLock(false);
    // Remove the images from the board as well
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.innerHTML = ""; // Clear each box's content
    });
  };

  return (
    <div className='container'>
      <h1 className="title">
        Tic<span>Tac </span>Toe
      </h1>
      <h2>{winner ? (winner === "draw" ? "It's a Draw!" : `${winner.toUpperCase()} wins!`) : `Player ${count % 2 === 0 ? "O" : "X"}'s turn`}</h2>
      <div className="board">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="box"
            onClick={(e) => toggle(e, index)} // Use index to track the box
          ></div>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default Tictactoe;
