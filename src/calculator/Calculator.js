import { useReducer } from "react";
import classes from "./Calculator.module.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function evaluate(state) {
  let prevOper = parseFloat(state.previousOperand);
  let curOper = parseFloat(state.currentOperand);
  if (isNaN(prevOper) || isNaN(curOper)) {
    return "";
  }
  let result;
  if (state.operand === "+") {
    result = prevOper + curOper;
  } else if (state.operand === "-") {
    result = prevOper - curOper;
  } else if (state.operand === "*") {
    result = prevOper * curOper;
  } else if (state.operand === "÷") {
    result = prevOper / curOper;
  }
  return result.toString(); // BEZ TOHOTO JSEM NEMOHLA ZA VYSLEDEK PAK DAT DESETINNOU TECKU!!!!!!!!
}

const calculatorReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      // ABYCHOM NEMOHLI DAT DVE NULY ZA SEBOU, TZN KDYZ UZ TAM JEDNA NULA JE:
      if (action.payload === "0" && state.currentOperand === "0") {
        return state;
      }
      // ABY SE NEMOHLO ZACIT DESETINNOU TECKOU:
      if (action.payload === "." && state.currentOperand === "") {
        return state;
      }
      // ABYCHOM NEMELI VIC DESETINNYCH TECEK
      if (action.payload === "." && state.currentOperand.includes(".")) {
        return state;
      }
      // POKUD MAME JAKO CURRENT OPERAND RESULT Z EVALUATE A CHCEME HO PREPSAT
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: action.payload,
          overwrite: false,
        };
      }

      //JINAK
      return {
        ...state,
        currentOperand: state.currentOperand.concat(action.payload),
      };

    case ACTIONS.CHOOSE_OPERATION:
      // KDYZ NEMAM ANI CURRENT ANI PREVIOUS:
      if (state.currentOperand === "" && state.previousOperand === "") {
        return state;
      }
      // KDYZ NEMAM PREVIOUS, ALE UZ TUKAM CURRENT (TEDY PRVNI CISLO)
      if (state.previousOperand === "") {
        return {
          ...state,
          previousOperand: state.currentOperand,
          operand: action.payload,
          currentOperand: "",
        };
      }
      // KDYZ MAM PREVIOUS I OPERAND, ALE ZMACKNU JINY OPERAND:
      if (state.operand !== "" && state.currentOperand === "") {
        return {
          ...state,
          operand: action.payload,
        };
      }

      // KDYZ MAM PREVIOUS I CURRENT A NEMACKAM ROVNA SE, ALE DALSI OPERAND
      return {
        ...state,
        currentOperand: "",
        previousOperand: evaluate(state),
        operand: action.payload,
      };

    case ACTIONS.EVALUATE:
      if (
        state.currentOperand === "" ||
        state.previousOperand === "" ||
        state.operand === ""
      ) {
        return state;
      }

      if (state.operand === "÷" && state.currentOperand === "0") {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        currentOperand: evaluate(state),
        previousOperand: "",
        operand: "",
      };

    case ACTIONS.DELETE_DIGIT:
      // KDYZ UZ JSME MELI RESULT, TAK DEL TLACITKO BUDE FUNGOVAT JAKO AC TLACITKO.
      if (state.overwrite) {
        return initialState;
      }
      if (state.currentOperand === "") {
        return state;
      }
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: "" };
      }

      //!!!!TAKHLE TO BYLO SPATNE: console.log(state.currentOperand.splice(-1,1)) // tohle je blbost, pristupovala jsem k tomu jako k array!!!!!!!!!!!! a pritom to je jen jeden string.
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.CLEAR:
      return initialState;
  }
};

// PRIDAME TU VLASTNOST OVERWRITE - KDYZ ZMAKCNEME ROVNA SE A VYJEDE NAM VYSLEDEK A PAK ZADAME CISLO, TAK CHCEME ABY SE TO PREPSALO NA TU NOVOU DIGIT.
const initialState = {
  currentOperand: "",
  previousOperand: "",
  operand: "",
  overwrite: false,
};

const Calculator = () => {
  const [calculatorState, dispatch] = useReducer(
    calculatorReducer,
    initialState
  );

  return (
    <section className={classes.mainSection}>
      <h1 className={classes.title}>Calculator</h1>
      <div className={classes.underline}></div>
      <div className={classes["calculator-grid"]}>
        <div className={classes.output}>
          <div className={classes["previous-operand"]}>
            {calculatorState.previousOperand} {calculatorState.operand}
          </div>
          <div className={classes["current-operand"]}>
            {calculatorState.currentOperand}
          </div>
        </div>
        <button
          className={classes["span-two-ac"]}
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
          DEL
        </button>
        <OperationButton operation="÷" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <button
          className={classes["span-two-eq"]}
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
      </div>
    </section>
  );
};

export default Calculator;
