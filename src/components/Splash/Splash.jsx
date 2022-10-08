import React, { useState } from "react";
import logo from "../../assets/logo.webp";
import "./Splash.css";

export default function Splash(props) {
  const start = () => {
    props.onClick();
  };
  return (
    <div className="splash-wrapper">
      <div className="logo-wrapper">
        <img style={{ width: "100%" }} src={logo} alt="logo" />
      </div>
      <div style={{ height: "30%" }}></div>
      <div onClick={start} className="fc button">
        START
      </div>
    </div>
  );
}
