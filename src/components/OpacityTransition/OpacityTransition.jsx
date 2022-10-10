import React, { useEffect } from "react";
import { useState } from "react";
import "./OpacityTransition.scss";

export default function OpacityTransition(props) {
  const [idleVisible, setIdleVisible] = useState(true);
  const [idleAnimation, setIdleAnimating] = useState(true);
  const [transitionToVisible, setTransitionToVisible] = useState(false);
  const [transitionToAnimation, setTransitionToAnimating] = useState(false);
  const speedUp = props.speedUp;
  useEffect(() => {
    if (props.children) {
      if (props.onStartAnimation) {
        props.onStartAnimation();
      }
      setIdleAnimating(false);
      setTimeout(
        () => {
          setIdleVisible(false);
          setTransitionToVisible(true);
          setTimeout(() => {
            setTransitionToAnimating(true);
            if (props.onEndAnimation) {
              props.onEndAnimation();
            }
          }, 100);
        },
        speedUp ? 500 : 1000
      );
    } else {
      setTransitionToAnimating(false);
      setTimeout(
        () => {
          setTransitionToVisible(false);
          setIdleVisible(true);
          setTimeout(() => {
            setIdleAnimating(true);
            if (props.onEndAnimation) {
              props.onEndAnimation();
            }
          }, 100);
        },
        speedUp ? 250 : 1000
      );
    }
  }, [props.children]);

  return (
    <div className="transition-wrapper">
      {idleVisible && (
        <div
          style={speedUp && { transition: "0.25s" }}
          className={`transition-element ${
            idleAnimation ? "transition-visible" : "transition-hidden"
          }`}>
          {props.idle}
        </div>
      )}
      {transitionToVisible && (
        <div
          style={speedUp && { transition: "0.25s" }}
          className={`transition-element ${
            transitionToAnimation ? "transition-visible" : "transition-hidden"
          }`}>
          {props.transitionTo}
        </div>
      )}
    </div>
  );
}
