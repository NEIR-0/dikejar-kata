import React, { useEffect } from "react";
import TimerBar from "../component/timerBar";
import UserCirlces from "../component/userCirlces";

const DisplayGame = ({ data }) => {
  let { players, selectedUserId, question, startTime, duration } = data;


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
  }, [data]);

  return (
    <>
      <div className="w-full h-full relative flex justify-center items-center">
        <div className="relative w-[500px] h-[500px]">
          <div className="ciclegraph w-[500px] h-[500px]">
            {players?.map((player) => {
              return <UserCirlces player={player} selectedUserId={selectedUserId} />;
            })}
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <TimerBar startTime={startTime} duration={duration} />
            <div className="text-center">
              <i className="fa-solid fa-bomb text-[70px] my-5" />
              <h1 className="text-[20px]">
                word: <span className="font-bold">{question}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayGame;
