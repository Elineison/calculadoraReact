// src/App.js
import React, { useState } from "react";
import Display from "./components/Display";
import Keypad from "./components/Keypad";
import "./App.css";

function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleButtonClick = (label) => {
    if (!isNaN(label)) {
      inputDigit(label);
    } else {
      switch (label) {
        case "C":
          clear();
          break;
        case "±":
          toggleSign();
          break;
        case "←":
          backspace();
          break;
        case ".":
          inputDecimal();
          break;
        case "+":
        case "-":
        case "×":
        case "÷":
          handleOperator(label);
          break;
        case "=":
          calculate();
          break;
        default:
          break;
      }
    }
  };

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const clear = () => {
    setDisplayValue("0");
    setOperator(null);
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
  };

  const toggleSign = () => {
    setDisplayValue((prev) =>
      prev.charAt(0) === "-" ? prev.slice(1) : "-" + prev
    );
  };

  const backspace = () => {
    if (displayValue.length === 1) {
      setDisplayValue("0");
    } else {
      setDisplayValue(displayValue.slice(0, -1));
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation(operator, firstOperand, inputValue);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setOperator(nextOperator);
    setWaitingForSecondOperand(true);
  };

  const performCalculation = (operator, a, b) => {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b !== 0 ? a / b : "Erro";
      default:
        return b;
    }
  };

  const calculate = () => {
    const inputValue = parseFloat(displayValue);

    if (operator && firstOperand !== null && !waitingForSecondOperand) {
      const result = performCalculation(operator, firstOperand, inputValue);
      setDisplayValue(String(result));
      setFirstOperand(result);
      setOperator(null);
    }
  };

  return (
    <div className="app">
      <div className="calculator">
        <Display value={displayValue} />
        <Keypad onButtonClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;