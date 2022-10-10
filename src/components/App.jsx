import React, { useState } from "react";
import "./App.scss";
import Game from "./Game/Game";
import OpacityTransition from "./OpacityTransition/OpacityTransition";
import Score from "./Score/Score";
import Splash from "./Splash/Splash";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(null);
  const [score, setScore] = useState(0);
  const startGame = () => setGameStarted(true);
  const finishGame = (score) => {
    setGameFinished(true);
    setScore(score);
  };
  const reset = () => {
    setGameFinished(null);
    setTimeout(() => {
      setGameStarted(false);
      setScore(0);
    }, 1000);
  };
  return (
    <div className="fc app">
      <div className="content">
        <OpacityTransition
          idle={<Splash onClick={startGame} />}
          transitionTo={
            <OpacityTransition
              idle={<Game reset={gameStarted} finishGame={finishGame} />}
              transitionTo={<Score reset={reset}>{score}</Score>}>
              {gameFinished}
            </OpacityTransition>
          }>
          {gameStarted}
        </OpacityTransition>
      </div>
      <div className="footer">Made by Szaggy 2022</div>
    </div>
  );
}
