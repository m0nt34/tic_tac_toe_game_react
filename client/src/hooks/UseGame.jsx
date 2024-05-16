import React, { useState } from "react";
import crossImg from "../assets/cross.svg";
import circleImg from "../assets/circle.svg";
import Confetti from "../components/Confetti";
const initialBOard = () => Array(9).fill({ img: null, value: null });
const UseGame = () => {
  const [board, setBoard] = useState(initialBOard());
  const [isXNext, setIsXNext] = useState(true);
  const WINNING_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (currBoard) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const [a, b, c] = WINNING_PATTERNS[i];
      if (
        currBoard[a].value &&
        currBoard[a].value === currBoard[b].value &&
        currBoard[a].value === currBoard[c].value
      ) {
        return currBoard[a].value;
      }
    }
    return null;
  };
  const handleClick = (i) => {
    const winner = calculateWinner(board);

    if (winner || board[i].img) return;

    const newBoard = [...board];
    newBoard[i] = isXNext
      ? {
          img: <img src={crossImg} alt="" />,
          value: "x",
        }
      : {
          img: <img src={circleImg} alt="" />,
          value: "o",
        };
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };
  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) {
      return (
        <>
          <Confetti />
          <div className="status">
            Player
            {winner === "x" ? (
              <img src={crossImg}></img>
            ) : (
              <img src={circleImg}></img>
            )}
            <p>Wins</p>
          </div>
        </>
      );
    }
    for (let i = 0; i < board.length; i++) {
      if (board[i].value === null) {
        if (!isXNext) {
          return (
            <div className="status">
              Player
              <img src={circleImg}></img>
              <p>Turn</p>
            </div>
          );
        } else {
          return (
            <div className="status">
              Player
              <img src={crossImg}></img>
              <p>Turn</p>
            </div>
          );
        }
      }
    }
    return (
      <div className="status">
        <img src={crossImg}></img>

        <span>Draw</span>
        <img src={circleImg}></img>
      </div>
    );
  };
  const resetGame = () => {
    setBoard(initialBOard());
    setIsXNext(true);
  };

  return { board, handleClick, calculateWinner, getStatusMessage, resetGame };
};

export default UseGame;
