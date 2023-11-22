import axios from "axios";
import { useEffect, useState } from "react";
import socket from "../socket";
import DisplayGame from "../views/displayGame";
import Winner from "./winner";

function GamePlay({ data, player }) {
  const { gameId } = useParams();
  const [turn, setTurn] = useState(true); // defaultnya "false"
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState({
    answer: "",
  });
  const [status, setStatus] = useState("waiting"); // playing | waiting | ended
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
          <div className={turn === true ? "w-[70%] h-screen bg-blue-600" : "w-full h-screen bg-blue-600 p-5 flex justify-center items-center"}>
            {/* game-play */}
            <DisplayGame question={question} turn={turn} player={player} />
          </div>

          {/* turn */}
          {turn === true ? (
            <div className="w-[30%] h-screen bg-green-600 p-5">
              <form onSubmit={submitAnswer} className="w-full h-full flex justify-center items-center flex-col">
                <div className="text-left mb-32">
                  <h1>title:{data && data.title}</h1>
                  <h1>language:{data && data.language}</h1>
                </div>
                <h1>Tuliskan jawaban mu!</h1>
                <input onChange={inputAnswer} name="answer" type="text" className="w-[40%] h-10 px-2 my-4" />
                <button className="py-2 px-5 bg-blue-500">submit</button>
              </form>
            </div>
          ) : (
            ""
          )}
        </section>
      )}

      {status === "waiting" && <Winner winner={winner} />}
    </>
  );
}

export default GamePlay;
