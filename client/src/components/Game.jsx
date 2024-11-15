import React, { useState } from "react";

import UseGame from "../hooks/UseGame";
import { useBoardSize } from "../store/boardSize";
import { useGameStarted } from "../store/gameStarted";

const Game = () => {
  const { board, handleClick, resetGame, getStatusMessage, setNewBoardSize } =
    UseGame();
  const { boardSize, setBoardSize } = useBoardSize();
  const { gameStarted } = useGameStarted();
  return (
    <div className="game">
      {getStatusMessage()}
      <div className="board_outer_cont">
        <div
          className="board"
          style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
        >
          {board.map((b, i) => {
            return (
              <button
                className="cell"
                key={i}
                onClick={() => handleClick(i)}
                disabled={b.img !== null}
                style={{ borderRadius: 64 / boardSize }}
              >
                {b.img}
              </button>
            );
          })}
        </div>
        <div
          className="size_cont"
          style={{ display: gameStarted ? "none" : "block" }}
        >
          <input
            type="range"
            min={3}
            max={10}
            defaultValue={3}
            onChange={(e) => {
              setBoardSize(e.target.value);
              setNewBoardSize(e.target.value);
            }}
          />
          <span>{boardSize}</span>
        </div>
      </div>
      <div className="bottom-cont">
        <button onClick={resetGame}>Reset</button>
        <div></div>
      </div>
    </div>
  );
};

export default Game;
