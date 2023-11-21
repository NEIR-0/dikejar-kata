import { useState } from "react";

function GamePlay() {
  const [turn, setTurn] = useState(false);
  return (
    <>
      <section className="w-full h-screen">
        {/* layar */}
        <div className={turn === true ? "w-full h-[70%] bg-blue-600" : "w-full h-screen bg-blue-600 p-5 flex justify-center items-center"}>
          {/* game-play */}
          <div className="w-[600px] h-[600px] bg-red-600 relative rounded-full">
            {/* boom */}
            <div className="absolute w-[150px] h-[150px]  bg-green-400 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-evenly items-center">
              <h1 className="text-[25px]">time</h1>
              <i class="fa-solid fa-bomb text-[70px]"></i>
              <h1 className="text-[25px]">word</h1>
            </div>

            {/* arror */}
            <div className="absolute left-[71%] top-1/2 -translate-x-1/2 -translate-y-1/2 origin-left rotate-180 w-[250px] h-4 bg-green-900"></div>
          </div>
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
