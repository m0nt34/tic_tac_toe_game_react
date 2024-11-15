import React, { useState } from "react";
import crossImg from "../assets/cross.svg";
import circleImg from "../assets/circle.svg";
import Confetti from "../components/Confetti";
import { useBoardSize } from "../store/boardSize";
import { useGameStarted } from "../store/gameStarted";
import { generateWinningPattern } from "../utils/generateWinningPattern";
import { useWinningPatterns } from "../store/winningPatterns";
const UseGame = () => {
  const { boardSize } = useBoardSize();
  const initialBOard = () =>
    Array(boardSize * boardSize).fill({ img: null, value: null });
  const { winningPatterns } = useWinningPatterns();
  const { gameStarted, setGameStarted } = useGameStarted();
  const [board, setBoard] = useState(initialBOard());
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = () => {
    for (let i = 0; i < winningPatterns.length; i++) {
      const indices = winningPatterns[i];

      if (
        indices.every(
          (index) =>
            board[index].value && board[index].value === board[indices[0]].value
        )
      ) {
        return board[indices[0]].value;
      }
    }
    return null;
  };
  const handleClick = (i) => {
    if (!gameStarted) setGameStarted(true);
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
    setIsXNext(true);
    setGameStarted(false);
    setBoard(initialBOard());
  };
  const setNewBoardSize = (newSize) => {
    const newBoard = () =>
      Array(newSize * newSize).fill({ img: null, value: null });
    generateWinningPattern(newSize);
    setBoard(newBoard());
  };
  return {
    board,
    handleClick,
    calculateWinner,
    getStatusMessage,
    resetGame,
    setNewBoardSize,
  };
};

export default UseGame;
