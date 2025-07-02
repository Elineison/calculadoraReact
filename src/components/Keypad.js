// src/components/Keypad.js
import React from "react";
import Button from "./Button";
import "./Keypad.css";

function Keypad({ onButtonClick }) {
  const buttons = [
    "C", "±", "←", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
  ];

  return (
    <div className="keypad">
      {buttons.map((btn) => (
        <Button key={btn} label={btn} onClick={onButtonClick} />
      ))}
    </div>
  );
}

export default Keypad;