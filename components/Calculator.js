import styles from "../styles/Calculator.module.scss";
import { useEffect, useState } from "react";
import clsx from "clsx";
import next from "next";

export default function Calculator() {
  const [screenNumber, setScreenNumber] = useState(0);
  const [prevNumber, setPrevNumber] = useState(null);
  const [nextNumber, setNextNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [operatorSymbol, setOperatorSymbol] = useState(null);

  // Calculate based on operator
  const calculateNumbers = (number1, number2) => {
    if (operator === "add") {
      return number1 + number2;
    }

    if (operator === "subtract") {
      return number1 - number2;
    }

    if (operator === "multiply") {
      return number1 * number2;
    }

    if (operator === "divide") {
      return number1 / number2;
    }
  };

  const handleOperation = (string) => {
    if (screenNumber === 0) {
      return;
    }

    if (operator && !nextNumber) {
      return;
    }

    if (!operator) {
      setOperator(string);
      setPrevNumber(parseInt(screenNumber));
      return;
    }

    if (operator && prevNumber) {
      setOperator(string);
      operatorCalculation();
      setPrevNumber(null);
      setNextNumber(null);
      return;
    }
  };

  // Update Operator symbol
  useEffect(() => {
    if (operator === "add") {
      setOperatorSymbol("+");
      return;
    }
    if (operator === "subtract") {
      setOperatorSymbol("-");
      return;
    }
    if (operator === "multiply") {
      setOperatorSymbol("*");
      return;
    }
    if (operator === "divide") {
      setOperatorSymbol("/");
      return;
    }
  }, [operator]);

  // Calculation function
  const operatorCalculation = () => {
    if (screenNumber === 0) {
      return;
    }

    if (!operator) {
      return;
    }

    if (operator && !nextNumber) {
      return;
    }

    setNextNumber(null);
    setOperatorSymbol(null);
    setOperator(null);

    const newNumber = calculateNumbers(prevNumber, nextNumber);
    setScreenNumber(parseInt(newNumber));
  };

  // Reset function
  const resetCalculator = () => {
    setScreenNumber(0);
    setPrevNumber(null);
    setNextNumber(null);
    setOperator(null);
    setOperatorSymbol(null);
  };

  const addNumber = (e) => {
    // If no operator is set
    if (!operator) {
      if (screenNumber === 0) {
        setScreenNumber(e);
        return;
      }

      if (screenNumber !== 0) {
        setScreenNumber(parseInt("" + screenNumber + e));
        return;
      }

      return;
    }

    // If operator is set
    if (operator) {
      if (!nextNumber) {
        //setScreenNumber(e);
        setNextNumber(e);
        return;
      }

      if (nextNumber) {
        //setScreenNumber(parseInt("" + screenNumber + e));
        setNextNumber(parseInt("" + nextNumber + e));
        return;
      }
    }
  };

  const deleteValues = () => {
    if (operator && !nextNumber) {
      setOperator(null);
      setOperatorSymbol(null);
      return;
    }

    if (screenNumber && !nextNumber) {
      let slicedNumber = String(screenNumber);

      if (slicedNumber.length > 1) {
        slicedNumber = String(screenNumber).slice(0, -1);
        setScreenNumber(parseInt(slicedNumber));
        return;
      } else {
        setScreenNumber(0);
      }
    }

    if (nextNumber) {
      let slicedNumber = String(nextNumber);

      if (slicedNumber.length > 1) {
        slicedNumber = String(nextNumber).slice(0, -1);
        setNextNumber(parseInt(slicedNumber));
        return;
      } else {
        setNextNumber(null);
      }
    }
  };

  return (
    <div className={styles.Calculator}>
      <div className={styles.screen}>
        {/* <span>{prevNumber}</span> */}
        <p>
          {screenNumber}
          {operatorSymbol}
          {nextNumber}
        </p>
      </div>
      <div className={styles.numberPad}>
        <div className={styles.row}>
          <div
            className={`${styles.key} ${styles.gray}`}
            onClick={resetCalculator}
          >
            <span>AC</span>
          </div>
          <div
            className={`${styles.key} ${styles.gray}`}
            onClick={deleteValues}
          >
            DEL
          </div>
          <div className={`${styles.key} ${styles.gray}`}>%</div>
          <div
            className={`${styles.key} ${styles.accent}`}
            onClick={() => handleOperation("divide")}
          >
            /
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.key} onClick={() => addNumber(7)}>
            7
          </div>
          <div className={styles.key} onClick={() => addNumber(8)}>
            8
          </div>
          <div className={styles.key} onClick={() => addNumber(9)}>
            9
          </div>
          <div
            className={clsx(
              styles.key,
              styles.accent,
              operator === "multiply" && styles.active
            )}
            onClick={() => handleOperation("multiply")}
          >
            x
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.key} onClick={() => addNumber(4)}>
            4
          </div>
          <div className={styles.key} onClick={() => addNumber(5)}>
            5
          </div>
          <div className={styles.key} onClick={() => addNumber(6)}>
            6
          </div>
          <div
            className={clsx(
              styles.key,
              styles.accent,
              operator === "add" && styles.active
            )}
            onClick={() => handleOperation("add")}
          >
            +
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.key} onClick={() => addNumber(1)}>
            1
          </div>
          <div className={styles.key} onClick={() => addNumber(2)}>
            2
          </div>
          <div className={styles.key} onClick={() => addNumber(3)}>
            3
          </div>
          <div
            className={clsx(
              styles.key,
              styles.accent,
              operator === "subtract" && styles.active
            )}
            onClick={() => handleOperation("subtract")}
          >
            -
          </div>
        </div>
        <div className={styles.row}>
          <div
            className={`${styles.key} ${styles.wide}`}
            onClick={() => addNumber(0)}
          >
            <span>0</span>
          </div>
          <div className={styles.key}>,</div>
          <div
            className={clsx(styles.key, styles.accent)}
            onClick={operatorCalculation}
          >
            =
          </div>
        </div>
      </div>
    </div>
  );
}
