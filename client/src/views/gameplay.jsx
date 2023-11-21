import { useState } from "react";
import DisplayGame from "../views/displayGame";
 
function GamePlay() {
  const [turn, setTurn] = useState(false);
  return (
    <>
      <section className="w-full h-screen">
        {/* layar */}
        <div className={turn === true ? "w-full h-[70%] bg-blue-600" : "w-full h-screen bg-blue-600 p-5 flex justify-center items-center"}>
          {/* game-play */}
          <DisplayGame />
        </div>

        {/* turn */}
        {turn === true ? (
          <div className="w-full h-[30%] bg-green-600 ">
            <form className="w-full h-full flex justify-center items-center">
              <input type="text" className="w-[60%] h-10 px-5" />
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
