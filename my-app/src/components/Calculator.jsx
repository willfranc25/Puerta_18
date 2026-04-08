import React, { useState } from 'react';
import Boton from './boton';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEqual = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="keypad">
        <div className="row">
          <Boton texto="C" onClick={clear} className="clear" />
          <Boton texto="/" onClick={() => performOperation('/')} className="operator" />
        </div>
        <div className="row">
          <Boton texto="7" onClick={() => inputNumber(7)} />
          <Boton texto="8" onClick={() => inputNumber(8)} />
          <Boton texto="9" onClick={() => inputNumber(9)} />
          <Boton texto="*" onClick={() => performOperation('*')} className="operator" />
        </div>
        <div className="row">
          <Boton texto="4" onClick={() => inputNumber(4)} />
          <Boton texto="5" onClick={() => inputNumber(5)} />
          <Boton texto="6" onClick={() => inputNumber(6)} />
          <Boton texto="-" onClick={() => performOperation('-')} className="operator" />
        </div>
        <div className="row">
          <Boton texto="1" onClick={() => inputNumber(1)} />
          <Boton texto="2" onClick={() => inputNumber(2)} />
          <Boton texto="3" onClick={() => inputNumber(3)} />
          <Boton texto="+" onClick={() => performOperation('+')} className="operator" />
        </div>
        <div className="row">
          <Boton texto="0" onClick={() => inputNumber(0)} className="zero" />
          <Boton texto="." onClick={inputDecimal} />
          <Boton texto="=" onClick={handleEqual} className="equals" />
        </div>
      </div>
    </div>
  );
};

export default Calculator;