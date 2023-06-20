import { useRef, useState } from "react";

const SimpleInput = (props) => {
  // ref를 사용해서 필요할 때 input요소로부터 값을 읽는다.
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);

  // 1. onChange로 input값을 넣는 방법
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault(); // 기본적으로 브라우저는 form 안에 있는 button을 통해서 폼이 제출되면
    // 웹사이트를 제공하는 서버로 HTTP 요청을 보내게 됨. 이게 자동으로 이뤄지는데 여기서 문제는
    // 실제로 우리에게는 요청을 처리할 서버가 없고 html과 자바스크립트만 전송하는  정적서버만 있다는 점.
    // 따라서 이 요청을 보내지 않도록 하기 위함.

    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      // 처음과 끝의 공백을 없애줌
      return; // 이 함수의 다음코드가 더이상 실행 되지 않게함.
    }

    setEnteredNameIsValid(true);

    console.log("enteredName>> ", enteredName); // state로부터 값 읽기
    // ref는 항상 current 프로퍼티를 갖는 객체.
    // 2. ref로 input값을 넣는 방법
    // input요소는 항상 value 프로퍼티를 가짐
    const enteredValue = nameInputRef.current.value; // current ref에 할당한 값을 갖고 있음(in this case, input요소에 대한 포인터가 current에 저장)
    console.log("enteredValue>> ", enteredValue); // ref로부터 값 읽기
    // nameInputRef.current.value = ''; 이렇게 입력값 초기화 가능 but ideal하지 않음.
    // 왜냐? DOM을 직접 조작하는 것이므로 지양해야함. 리액트로만 DOM을 조작해야함.
    setEnteredName("");
  };
  // state나 ref 둘 중 하나 사용하면 됨
  // 어떨 때 어떤걸 쓰나?
  // 만일 formSubmissionHandler가 폼이 제출됐을 때 한번만 필요하다면 >> ref
  // 왜냐? 모든 키 입력마다 상태값을  업데이트 하기엔 과하기 때문.

  // 반면 즉각적인 유효성 검증을 위해  키 입력마다 입력 값이 필요하다면 >> state
  // state의 다른 장점 : 입력된 값을 초기화하고 싶을 때. (ref로도 구현 가능 but 복잡 and 지양)

  const nameInputClasses = enteredNameIsValid
    ? "form-control"
    : "form-control invalid";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        {/* 함수를 input 요소의 이벤트 변경에 연결하고나면 자동적으로 이벤트를 설명하는 event객체가 얻어지며 이를 통해 입력된 값을 얻을 수 있음. */}
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
        {!enteredNameIsValid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
