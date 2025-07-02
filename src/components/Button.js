// src/components/Button.js
import React from "react";
import "./Button.css";

function Button({ label, onClick }) {
  return (
    <button onClick={() => onClick(label)} className="btn">
      {label}
    </button>
  );
}

export default Button;