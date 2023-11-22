import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import socket from "../socket";
import DisplayGame from "../views/displayGame";

import questionImg from "../../public/question.png";

function GamePlay() {
  const { gameId } = useParams();

  const [isWaiting, setIsWaiting] = useState(true);

  const [turn, setTurn] = useState(false); // defaultnya "false"

  const [data, setData] = useState({});
  const [answer, setAnswer] = useState("");

  const [feedback, setFeedback] = useState(<></>);

  // const [winner, setWinner] = useState("");

  useEffect(() => {
    socket.on("SERVER_QUESTION", (newData) => {
      setIsWaiting(false);

      setFeedback(<></>);

      if (newData.selectedUserId == localStorage.userId) {
        setTurn(true);
      } else {
        setTurn(false);
      }

      setData(newData);
    });

    socket.on("SERVER_CORRECT", () => {
      if (turn) {
        setFeedback(<p className="text-green-500">Correct Answer!</p>);
      }

      setIsWaiting(false);
    });

    socket.on("SERVER_WRONG", () => {
      setFeedback(<p className="text-red-500">Wrong Answer!</p>);

      setIsWaiting(false);
    });

    socket.on("SERVER_TIMEOUT", () => {
      setIsWaiting(false);
    });

    // gameover
    socket.on("SERVER_GAMEOVER", (data) => {
      console.log("game over");
      // todo (lal): tampilkan tulisan game over, seperti waiting ready player
      // todo: untuk redirect ke halaman result pake event SERVER_RESULT
    });

    return () => {
      socket.off("SERVER_QUESTION");
      socket.off("SERVER_CORRECT");
      socket.off("SERVER_WRONG");
      socket.off("SERVER_TIMEOUT");
    };
  }, []);

  const inputAnswer = (e) => {
    const { value } = e.target;
    setAnswer(value);
  };

  const submitAnswer = (e) => {
    e.preventDefault();
    socket.emit("CLIENT_ANSWER", { gameId: gameId, userId: localStorage.userId, answer: answer }); // gameId dapat dari mana?
  };

  return (
    <>
      {isWaiting && (
        <section className="h-screen w-full flex justify-center items-center">
          <h1 className="text-[100px]">Waiting another player...</h1>
        </section>
      )}

      {!isWaiting && (
        <section className="w-full h-screen relative flex">
          {/* layar */}
          <div className={turn === true ? "w-[70%] h-screen" : "w-full h-screen p-5 flex justify-center items-center"}>
            {/* game-play */}
            <DisplayGame data={data} />
          </div>

          {/* turn */}
          {turn === true ? (
            <div className="w-[30%] h-screen bg-yellow-200 p-5">
              <form onSubmit={submitAnswer} className="w-full h-full flex justify-center items-center flex-col">
                <img className="w-28" src={questionImg} />
                <h1 className="">Tuliskan jawaban mu!</h1>
                {feedback}
                <input autoFocus onChange={inputAnswer} name="answer" type="text" className="w-[60%] h-7 rounded-md px-2 my-4 border border-black" />
                <button className="py-2 px-5 bg-sky-400 text-white rounded-md">submit</button>
              </form>
            </div>
          ) : (
            ""
          )}
        </section>
      )}

      {/* {status === "ended" && <Winner winner={winner} />} */}
    </>
  );
}

export default GamePlay;
