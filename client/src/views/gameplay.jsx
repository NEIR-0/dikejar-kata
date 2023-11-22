import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import socket from "../socket";
import DisplayGame from "../views/displayGame";
import Winner from "./winner";

import questionImg from "../../public/question.png";

function GamePlay({ data, player }) {
  const { gameId } = useParams();
  const [turn, setTurn] = useState(false); // defaultnya "false"
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState({
    answer: "",
  });
  const [status, setStatus] = useState("playing"); // playing | waiting | ended
  const [winner, setWinner] = useState("");
  useEffect(() => {
    socket.emit("CLIENT_READY");
    socket.on("SERVER_QUESTION", (data) => {
      if (selectedUserId === localStorage.userId) {
        setTurn(true);
      }
      setStatus("playing");
      setQuestion(data.question);
    });
    socket.emit("CLIENT_ANSWER", { gameId: gameId, userId: localStorage.userId, answer: answer }); // gameId dapat dari mana?

    // gameover
    socket.on("SERVER_GAMEOVER", (data) => {
      setWinner(data.winner);
      setStatus("ended");
      console.log("gameover");
    });
  }, []);

  const inputAnswer = (e) => {
    const { name, value } = e.target;
    setAnswer({
      ...answer,
      [name]: value,
    });
  };
  console.log(answer);

  const submitAnswer = (e) => {
    setTurn(false);
  };
  return (
    <>
      {status === "waiting" && (
        <section className="h-screen w-full flex justify-center items-center">
          <h1 className="text-[100px]">Waiting another player...</h1>
        </section>
      )}

      {status === "playing" && (
        <section className="w-full h-screen relative flex">
          {/* layar */}
          <div className={turn === true ? "w-[70%] h-screen" : "w-full h-screen p-5 flex justify-center items-center"}>
            {/* game-play */}
            <DisplayGame question={question} turn={turn} player={player} />
          </div>

          {/* turn */}
          {turn === true ? (
            <div className="w-[30%] h-screen bg-yellow-200 p-5">
              <form onSubmit={submitAnswer} className="w-full h-full flex justify-center items-center flex-col">
                <img className="w-28" src={questionImg} />
                <h1 className="">Tuliskan jawaban mu!</h1>
                <input onChange={inputAnswer} name="answer" type="text" className="w-[60%] h-7 rounded-md px-2 my-4 border border-black" />
                <button className="py-2 px-5 bg-sky-400 text-white rounded-md">submit</button>
              </form>
            </div>
          ) : (
            ""
          )}
        </section>
      )}

      {status === "ended" && <Winner winner={winner} />}
    </>
  );
}

export default GamePlay;
