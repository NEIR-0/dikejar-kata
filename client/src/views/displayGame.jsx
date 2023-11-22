import React, { useEffect } from "react";
import TimerBar from "../component/timerBar";
import UserCirlces from "../component/userCirlces";

const DisplayGame = ({ turn }) => {
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
        <div className="ciclegraph bg-yellow-400 relative w-[500px] h-[500px]">
          <UserCirlces turn={turn} />
        </div>
        <div
          className={
            turn === true
              ? "absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col bg-white"
              : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col bg-white"
          }
        >
          <TimerBar />
          bom
          <h1>soal</h1>
        </div>
      </div>
    </>
  );
};

export default DisplayGame;
