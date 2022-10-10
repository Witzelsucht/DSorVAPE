import React from "react";
import "./Score.scss";
import logo from "../../assets/logo.webp";

export default function Score(props) {
  const score = props.children;
  return (
    <div className="score-wrapper">
      <div className="fc logo-wrapper">
        <img style={{ height: "100%" }} src={logo} alt="logo" />
      </div>
      <div className="text">
        <h3>Your score is</h3>
        <h1>{score}/10</h1>
        {score >= 8 && <h3>Congrats!</h3>}
        <h4>Thanks for playing!</h4>
      </div>
      <div className="return-wrapper">
        <div
          className="button"
          onClick={props.reset}
          style={{ marginTop: "5rem" }}>
          Return
        </div>
      </div>
    </div>
  );
}
