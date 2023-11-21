import React, { useEffect } from "react";
import TimerBar from "../component/timerBar";
import UserCirlces from "../component/userCirlces";

const UjiCoba = () => {
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
      <section className="w-full h-screen bg-red-500 flex justify-center items-center relative">
        <div className="ciclegraph bg-yellow-400">
          <UserCirlces />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <TimerBar />
          bom
          <h1>soal</h1>
        </div>
      </section>
    </>
  );
};

export default UjiCoba;
