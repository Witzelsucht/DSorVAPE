import React from "react";
import "./Game.scss";
import logo from "../../assets/logo.webp";
import question from "../../assets/questionmarks.webp";
import { useEffect } from "react";
import { useState } from "react";
import { DARK_SOULS, data, VAPE } from "../../data/data";
import OpacityTransition from "../OpacityTransition/OpacityTransition";
import GameButton from "./GameButton/GameButton";

export default function Game(props) {
  const [currentQuestion, setCurrentQuestion] = useState({
    title: "",
    answer: null,
  });
  const [alreadyFetched, setAlreadyFetched] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [answerShown, showAnswer] = useState(null);
  const [buttonsEnabled, setButtonsEnabled] = useState(true);

  useEffect(() => {
    if (!props.reset) {
      setScore(0);
      setRound(0);
      showAnswer(null);
      setAlreadyFetched([]);
      setButtonsEnabled(true);
    }
  }, [props.reset]);

  useEffect(() => {
    if (round >= 10) {
      props.finishGame(score);
      return;
    }
    showAnswer(null);
    let index;
    do {
      index = Math.round(Math.random() * 100) % 30;
    } while (alreadyFetched.find((a) => a === data[index].title));
    alreadyFetched.push(data[index].title);
    setAlreadyFetched(alreadyFetched);
    setTimeout(() => {
      setCurrentQuestion(data[index]);
    }, 250);
  }, [round]);

  const selectAnswer = (answer) => {
    if (answerShown) return;
    if (answer === currentQuestion.answer) {
      setScore(score + 1);
    }
    showAnswer(currentQuestion.answer);
    setTimeout(() => setRound(round + 1), 3000);
  };

  const onStartAnimation = () => setButtonsEnabled(false);
  const onEndAnimation = () => setButtonsEnabled(true);

  return (
    <div className="fc game-wrapper">
      <div className="fc header-logo-wrapper">
        <img style={{ height: "100%" }} src={logo} alt="logo" />
      </div>
      <div className="title">{currentQuestion.title}</div>
      <div className="image-wrapper">
        <OpacityTransition
          speedUp
          onStartAnimation={onStartAnimation}
          onEndAnimation={onEndAnimation}
          idle={<img src={question} className="image mask" alt="mask" />}
          transitionTo={
            <img
              src={currentQuestion.image}
              className="image answer-image"
              alt="answerImg"
            />
          }>
          {answerShown}
        </OpacityTransition>
      </div>
      <div className="buttons">
        <GameButton
          buttonAnswer={DARK_SOULS}
          className="ds"
          disabled={!buttonsEnabled}
          shownAnswer={answerShown}
          onClick={() => selectAnswer(DARK_SOULS)}>
          Dark Souls
        </GameButton>
        <GameButton
          buttonAnswer={VAPE}
          className="vape"
          disabled={!buttonsEnabled}
          shownAnswer={answerShown}
          onClick={() => selectAnswer(VAPE)}>
          Vape
        </GameButton>
      </div>
      <div className="round">Round: {round}/10</div>
    </div>
  );
}
