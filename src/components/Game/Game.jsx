import React from "react";
import "./Game.css";
import logo from "../../assets/logo.webp";
import question from "../../assets/questionmarks.webp";
import { useEffect } from "react";
import { useState } from "react";
import { DARK_SOULS, data, VAPE } from "../../data/data";
import fume from "../../assets/images/Fume_Knight.webp";
import OpacityTransition from "../OpacityTransition/OpacityTransition";

export default function Game(props) {
  const [currentQuestion, setCurrentQuestion] = useState({
    title: "",
    answer: null,
  });
  const [alreadyFetched, setAlreadyFetched] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [answerShown, showAnswer] = useState(null);

  useEffect(() => {
    console.log(round);

    if (round >= 10) {
      console.log(round);
      props.finishGame(score);
    }
    showAnswer(null);
    let index;
    do {
      index = Math.round(Math.random() * 100) % 30;
    } while (alreadyFetched.find((a) => a === data[index].title));
    alreadyFetched.push(data[index].title);
    setAlreadyFetched(alreadyFetched);
    setCurrentQuestion(data[index]);
  }, [round]);

  const selectAnswer = (answer) => {
    if (answerShown) return;
    console.log(answer, currentQuestion);
    if (answer === currentQuestion.answer) {
      setScore(score + 1);
    }
    showAnswer(currentQuestion.answer);
    setTimeout(() => setRound(round + 1), 3000);
  };

  return (
    <div className="fc game-wrapper">
      <div className="fc header-logo-wrapper">
        <img
          className="logo"
          style={{ height: "100%" }}
          src={logo}
          alt="logo"
        />
      </div>
      <div className="title">{currentQuestion.title}</div>
      <div className="image-wrapper">
        <OpacityTransition
          speedUp
          idle={<img src={question} className="image mask" alt="mask" />}
          transitionTo={
            <img src={fume} className="image answer-image" alt="answerImg" />
          }>
          {answerShown}
        </OpacityTransition>
      </div>
      <div className="buttons">
        <div
          onClick={() => selectAnswer(DARK_SOULS)}
          className={`fc game-button ds ${answerShown ? "" : "block-answer"} ${
            answerShown === DARK_SOULS ? "correct-answer" : "wrong-answer"
          }`}>
          Dark Souls
        </div>
        <div
          onClick={() => selectAnswer(VAPE)}
          className={`fc game-button vape ${
            answerShown ? "" : "block-answer"
          } ${answerShown === VAPE ? "correct-answer" : "wrong-answer"}`}>
          Vape
        </div>
      </div>
      <div className="score">Score: {score}/10</div>
    </div>
  );
}
