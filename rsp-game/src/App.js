import "./App.css";
import reset from "./assets/ic-reset.svg";
import { useState } from "react";
import HandIcon from "./HandIcon.js";
import "./HandIcon.css";
import HandButton from "./HandButton.js";
import { compareHand, generateRandomHand } from "./utils.js";

// 우선 내가 가위바위보중에 하나를 눌러
// 그다음 상대는 랜덤하게 나와
// 그걸 내가 낸거랑 비교를 하고
// 승 패 무를 따져
// 그걸 승부기록에 입력하고
// 그다음 점수는 누적으로 더해져

// const choice = [
//   { id: 1, name: "rock", img: rock },
//   { id: 2, name: "scissor", img: scissor },
//   { id: 3, name: "paper", img: paper },
// ];
// console.log(choice);

// 온클릭은 실제 클릭되어야할때는 건 태그들이 눌려야해.
// 컴포넌트에서 onclick은 props 일 뿐이야
// prop은 함수도 전달가능해

// function rspNumber(my, other) {
//   const rspResult = my.id - other.id;
//   if (rspResult === 2 || rspResult === -1) {
//     return "win";
//   } else if (rspResult === 2 || rspResult === -1) {
//     return "lose";
//   } else {
//     return "draw";
//   }}

function getResult(comparison) {
  if (comparison > 0) return "승리";
  if (comparison < 0) return "패배";
  return "무승부";
  //결정된 승패를 state에 저장
}

function App() {
  const [hand, setHand] = useState("rock");
  const [otherHand, setOtherHand] = useState("rock");
  const [score, setScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);
  const [gameHistory, setGameHistory] = useState([]);
  const [isWin, setIsWin] = useState(0);

  const handleButtonClick = (value) => {
    console.log(value);

    //사용자가 클릭한 묵찌빠를 가져와
    setHand(value);
    //상대의 묵찌빠 랜덤으로 추출
    const nextOtherHand = generateRandomHand();
    setOtherHand(nextOtherHand);
    //승패 결정 ==> 배점을 곱해서 점수 추출
    const comparison = compareHand(value, nextOtherHand);
    setIsWin(comparison);
    if (comparison > 0) {
      setScore(score + bet);
    }
    if (comparison < 0) {
      setOtherScore(otherScore + bet);
    }
    if (comparison == 0) {
    }
    const result = getResult(comparison);
    setGameHistory([...gameHistory, result]);
  };

  const handleBetChange = (e) => {
    let num = Number(e.target.value);
    //원래 e.target.value 는 문자열로 나와
    //사용자가 숫자를 입력해버리면 그 안에 있는건 문자열이기 때문에
    if (num > 9) num %= 10;
    if (num < 1) num = 1;
    num = Math.floor(num);
    setBet(num);
  };

  const handleClearClick = () => {
    setHand("rock");
    setOtherHand("rock");
    setScore(0);
    setOtherScore(0);
    setBet(1);
    setGameHistory([]);
    setIsWin(0);
  };
  return (
    <div className="App">
      <h1 className="App-heading">가위바위보</h1>
      <img src={reset} className="App-reset" onClick={handleClearClick} />
      <div className="App-scores">
        <div className="Score">
          <div className="Score-num">{score}</div>
          <div className="Score-name">나</div>
        </div>
        <div className="App-versus">:</div>
        <div className="Score">
          <div className="Score-num">{otherScore}</div>
          <div className="Score-name">너</div>
        </div>
      </div>
      <div className="Box App-box">
        {/* 가위바위보 내는곳 */}
        <div className="App-hands">
          <div
            className={`Hand ${isWin == 0 ? "" : isWin == 1 ? "winner" : ""}`}
          >
            <HandIcon className="Hand-icon" value={hand} />
          </div>
          <div className="App-versus">VS</div>
          <div
            className={`Hand ${isWin == 0 ? "" : isWin == 1 ? "" : "winner"}`}
          >
            <HandIcon className="Hand-icon" value={otherHand} />
            {/* 여기에다 쓴 className 은 우리가 아는 className이 아니고 props 이야 그래서 HandIcon 에서 className={className}을 써준거야*/}
          </div>
        </div>
        {/* 배점 */}
        <div className="App-bet">
          <span>배점</span>
          <input
            type="number"
            min={1}
            max={9}
            value={bet}
            onChange={handleBetChange}
          />
          <span>배</span>
        </div>
        {/* 기록 */}
        <div className="App-history">
          <h2>승부기록</h2>
          <p>{gameHistory.join(", ")}</p>
        </div>
      </div>
      <div>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;
