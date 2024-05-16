import React, { useState } from "react";
import crossImg from "../assets/cross.svg";
import circleImg from "../assets/circle.svg";
import UseGame from "../hooks/UseGame";

const Game = () => {
  const { board, handleClick, calculateWinner, resetGame, getStatusMessage } =
    UseGame();
  return (
    <div className="game">
      {getStatusMessage()}

      <div className="board">
        {board.map((b, i) => {
          return (
            <button
              className="cell"
              key={i}
              onClick={() => handleClick(i)}
              disabled={b.img !== null}
            >
              {b.img}
            </button>
          );
        })}
      </div>
      <div className="bottom-cont">
        <button onClick={resetGame}>Reset</button>
        <div></div>
      </div>
    </div>
  );
};

export default Game;
