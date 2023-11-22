import { useState } from "react";
import DisplayGame from "../views/displayGame";

function GamePlay() {
  // const [turn, setTurn] = useState(false);
  const [turn, setTurn] = useState(true);

  const changeTurn = () => {
    setTurn((last) => !last);
  };
  return (
    <>
      <section className="w-full h-screen relative flex">
        <button onClick={changeTurn} className="absolute left-0 top-0">
          click
        </button>
        {/* layar */}
        <div className={turn === true ? "w-[70%] h-screen bg-blue-600" : "w-full h-screen bg-blue-600 p-5 flex justify-center items-center"}>
          {/* game-play */}
          <DisplayGame turn={turn} />
        </div>

        {/* turn */}
        {turn === true ? (
          <div className="w-[30%] h-screen bg-green-600 ">
            <form className="w-full h-full flex justify-center items-center flex-col">
              <h1>Tuliskan jawaban mu!</h1>
              <input type="text" className="w-[40%] h-10 px-2 my-4" />
              <button className="py-2 px-5 bg-blue-500">submit</button>
            </form>
          </div>
        ) : (
          ""
        )}
      </section>
    </>
  );
}

export default GamePlay;
