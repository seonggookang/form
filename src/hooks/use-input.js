// 커스텀 훅

import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue, // enteredValue를 value로 설정
    isValid: valueIsValid,
    hasError, // value를 안 넣어주면 hasError: hasError << 이거랑 똑같음
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
