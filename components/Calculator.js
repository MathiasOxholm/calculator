import styles from "../styles/Calculator.module.scss";
import { useEffect, useState } from "react";

export default function Calculator() {
  const [screenNumber, setScreenNumber] = useState(0);
  const [prevNumber, setPrevNumber] = useState(null);
  const [nextNumber, setNextNumber] = useState(null);
  const [perform, setPerform] = useState(null);
  const [operatorSymbol, setOperatorSymbol] = useState(null);

  const addNumbers = (number1, number2) => {
    return number1 + number2;
  };

  const multiplyNumbers = (number1, number2) => {
    return number1 * number2;
  };

  const subtractNumbers = (number1, number2) => {
    return number1 - number2;
  };

  const divideNumbers = (number1, number2) => {
    return number1 / number2;
  };

  const setOperation = (string) => {
    if (!perform) {
      setPerform(string);
      setPrevNumber(parseInt(screenNumber));
      return;
    }

    if (perform && prevNumber) {
      setPerform(string);
      performCalculation();
      setPrevNumber(null);
      setNextNumber(null);
      return;
    }
  };

  useEffect(() => {
    if (perform === "add") {
      setOperatorSymbol("+");
      return;
    }
    if (perform === "subtract") {
      setOperatorSymbol("-");
      return;
    }
    if (perform === "multiply") {
      setOperatorSymbol("*");
      return;
    }
    if (perform === "divide") {
      setOperatorSymbol("/");
      return;
    }
  }, [perform]);

  const performCalculation = () => {
    setNextNumber(null);
    setOperatorSymbol(null);
    setPerform(null);

    if (perform === "add") {
      const newNumber = addNumbers(prevNumber, nextNumber);
      setScreenNumber(parseInt(newNumber));
      return;
    }

    if (perform === "subtract") {
      const newNumber = subtractNumbers(prevNumber, nextNumber);
      setScreenNumber(newNumber);
      return;
    }

    if (perform === "multiply") {
      const newNumber = multiplyNumbers(prevNumber, nextNumber);
      setScreenNumber(newNumber);
      return;
    }

    if (perform === "divide") {
      const newNumber = divideNumbers(prevNumber, nextNumber);
      setScreenNumber(newNumber);
      return;
    }
  };

  // Reset function
  const resetCalculator = () => {
    setScreenNumber(0);
    setPrevNumber(null);
    setNextNumber(null);
    setPerform(null);
    setOperatorSymbol(null);
  };

  const addNumber = (e) => {
    // If no operator is set
    if (!perform) {
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
    if (perform) {
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
            AC
          </div>
          <div className={`${styles.key} ${styles.gray}`}>+/-</div>
          <div className={`${styles.key} ${styles.gray}`}>%</div>
          <div
            className={`${styles.key} ${styles.accent}`}
            onClick={() => setOperation("divide")}
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
            className={`${styles.key} ${styles.accent}`}
            onClick={() => setOperation("multiply")}
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
            className={`${styles.key} ${styles.accent}`}
            onClick={() => setOperation("add")}
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
            className={`${styles.key} ${styles.accent}`}
            onClick={() => setOperation("subtract")}
          >
            -
          </div>
        </div>
        <div className={styles.row}>
          <div
            className={`${styles.key} ${styles.wide}`}
            onClick={() => addNumber(0)}
          >
            0
          </div>
          <div className={styles.key}>.</div>
          <div
            className={`${styles.key} ${styles.accent}`}
            onClick={performCalculation}
          >
            =
          </div>
        </div>
      </div>
    </div>
  );
}
