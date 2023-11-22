import React, { useEffect } from "react";
import TimerBar from "../component/timerBar";
import UserCirlces from "../component/userCirlces";

const DisplayGame = ({ question, turn, player }) => {
  useEffect(() => {
    document.querySelectorAll(".ciclegraph").forEach((ciclegraph) => {
      let circles = ciclegraph.querySelectorAll(".circle");
      let angle = 360 - 90,
        dangle = 360 / circles.length;
      for (let i = 0; i < circles.length; ++i) {
        let circle = circles[i];
        angle += dangle;
        circle.style.transform = `rotate(${angle}deg) translate(${ciclegraph.clientWidth / 2}px) rotate(-${angle}deg)`;
      }
    });
  }, []);

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <div className="ciclegraph relative w-[500px] h-[500px]">
          <UserCirlces turn={turn} />

          {/* {player &&
            player.map((el) => {
              return <UserCirlces key={el.id} data={el} turn={turn} />;
            })} */}
        </div>
        <div
          className={
            turn === true ? "absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col" : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col"
          }
        >
          <TimerBar />
          {/* bomb */}
          <i class="fa-solid fa-bomb text-[70px] my-5"></i>
          {/* <h1>word: {question}</h1> */}
          <h1 className="text-[20px]">
            word: <span className="font-bold">ASI</span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default DisplayGame;
