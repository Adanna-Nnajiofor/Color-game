import React, { useState, useEffect } from "react";
import "./index.css";

const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F333FF",
  "#33FFF5",
  "#F5FF33",
];

export default function ColorGame() {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [animationClass, setAnimationClass] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffledColors = [...colors].sort(() => 0.5 - Math.random());
    const newTargetColor =
      shuffledColors[Math.floor(Math.random() * shuffledColors.length)];
    setColorOptions(shuffledColors);
    setTargetColor(newTargetColor);
    setGameStatus("");
    setAnimationClass("");
    setScore(0);
    setIsGameOver(false);
  };

  const handleGuess = (color) => {
    if (isGameOver) return;

    if (color === targetColor) {
      setScore((prevScore) => prevScore + 1);
      setGameStatus("Correct! 🎉");
      setAnimationClass("animate-correct");
      setTimeout(() => startNewRound(), 500);
    } else {
      setGameStatus("Wrong! Game Over. ❌");
      setAnimationClass("animate-wrong");
      setIsGameOver(true);
    }
  };

  const startNewRound = () => {
    const shuffledColors = [...colors].sort(() => 0.5 - Math.random());
    const newTargetColor =
      shuffledColors[Math.floor(Math.random() * shuffledColors.length)];
    setColorOptions(shuffledColors);
    setTargetColor(newTargetColor);
    setAnimationClass("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1
        className="text-3xl font-bold mb-4 text-center"
        data-testid="gameInstructions"
      >
        Guess the correct color!
      </h1>
      <div
        className={`w-40 h-40 rounded-lg shadow-lg mb-6 ${animationClass}`}
        style={{ backgroundColor: targetColor }}
        data-testid="colorBox"
      ></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
        {colorOptions.map((color, index) => (
          <button
            key={index}
            className="w-20 h-20 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-500 transition-all duration-300"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
            disabled={isGameOver}
            data-testid="colorOption"
          ></button>
        ))}
      </div>
      <p className="text-xl font-medium mb-2" data-testid="gameStatus">
        {gameStatus}
      </p>
      <p className="text-lg mb-4" data-testid="score">
        Score: {score}
      </p>
      <button
        onClick={startNewGame}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
        data-testid="newGameButton"
      >
        New Game
      </button>
    </div>
  );
}
