import React, { useState } from "react";
import "./App.css";
import Game from "./Game/Game";
import OpacityTransition from "./OpacityTransition/OpacityTransition";
import Score from "./Score/Score";
import Splash from "./Splash/Splash";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(null);
  const [score, setScore] = useState(0);
  console.log(gameFinished);
  const startGame = () => setGameStarted(true);
  const finishGame = (score) => {
    setGameFinished(true);
    setScore(score);
  };
  return (
    <div className="fc app">
      <div className="content">
        <OpacityTransition
          idle={<Splash onClick={startGame} />}
          transitionTo={
            <OpacityTransition
              idle={<Game finishGame={finishGame} />}
              transitionTo={<Score />}>
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
