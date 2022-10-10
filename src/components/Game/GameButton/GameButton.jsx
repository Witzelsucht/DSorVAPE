import React from "react";
import "./GameButton.scss";

export default function GameButton(props) {
  const onClick = props.onClick;
  const buttonAnswer = props.buttonAnswer;
  const shownAnswer = props.shownAnswer;
  const disabled = props.disabled;
  return (
    <div
      onClick={onClick}
      className={`fc game-button ${props.className} ${
        disabled ? "button-disabled" : ""
      } ${shownAnswer ? "" : "block-answer"} ${
        shownAnswer === buttonAnswer ? "correct-answer" : "wrong-answer"
      }`}>
      {props.children}
    </div>
  );
}
