// useReducer

import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched }; // isTouched를 true로 바꾸면 안된다. key stroke를 아직 마친게 아니기 때문에. so we need to use previous state
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value }; // 사용자가 입력칸을 건드렸다는 의미이므로 true로.value와는 관련 없으므로 value는 existging value로.
  }
  if (action.type === "RESET") {
    return {
      isTouched: false,
      value: "",
    };
  }
  return inputStateReducer;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  // const [enteredValue, setEnteredValue] = useState("");
  // const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
    // setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
    // setIsTouched(true);
  };

  const reset = () => {
    // setEnteredValue("");
    // setIsTouched(false);
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value, // enteredValue를 value로 설정
    isValid: valueIsValid,
    hasError, // value를 안 넣어주면 hasError: hasError << 이거랑 똑같음
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
