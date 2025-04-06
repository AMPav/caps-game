import { useState } from "react";

export default function CapsGamePrototype() {
  const [stage, setStage] = useState("start");
  const [playerMove, setPlayerMove] = useState(null);
  const [opponentMove, setOpponentMove] = useState(null);
  const [rpsResult, setRpsResult] = useState(null);
  const [capsLeft, setCapsLeft] = useState(10);
  const [collected, setCollected] = useState(0);

  const moves = ["rock", "paper", "scissors"];

  const getRpsWinner = (p1, p2) => {
    if (p1 === p2) return "draw";
    if (
      (p1 === "rock" && p2 === "scissors") ||
      (p1 === "scissors" && p2 === "paper") ||
      (p1 === "paper" && p2 === "rock")
    ) {
      return "player";
    }
    return "opponent";
  };

  const handleRps = (move) => {
    const opponent = moves[Math.floor(Math.random() * 3)];
    const result = getRpsWinner(move, opponent);
    setPlayerMove(move);
    setOpponentMove(opponent);
    setRpsResult(result);
    setStage("throw");
  };

  const handleThrow = () => {
    if (capsLeft === 0) return;
    const captured = Math.floor(Math.random() * 3);
    setCollected(collected + captured);
    setCapsLeft(capsLeft - 1);
    if (capsLeft - 1 === 0) setStage("end");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Сотки — прототип</h1>

      {stage === "start" && (
        <div>
          <p>Выберите ход (камень, ножницы или бумага):</p>
          {moves.map((move) => (
            <button key={move} onClick={() => handleRps(move)} style={{ margin: "5px" }}>
              {move}
            </button>
          ))}
        </div>
      )}

      {stage === "throw" && (
        <div>
          <p>Ваш ход: {playerMove}</p>
          <p>Ход соперника: {opponentMove}</p>
          <p>
            Результат:{" "}
            {rpsResult === "draw"
              ? "Ничья"
              : rpsResult === "player"
              ? "Вы начинаете"
              : "Соперник начинает"}
          </p>
          <button onClick={handleThrow}>Бросить фишки ({capsLeft} осталось)</button>
          <p>Собрано фишек: {collected}</p>
        </div>
      )}

      {stage === "end" && (
        <div>
          <p>Игра завершена!</p>
          <p>Вы захватили {collected} фишек.</p>
          <button
            onClick={() => {
              setStage("start");
              setPlayerMove(null);
              setOpponentMove(null);
              setRpsResult(null);
              setCapsLeft(10);
              setCollected(0);
            }}
          >
            Сыграть снова
          </button>
        </div>
      )}
    </div>
  );
}
