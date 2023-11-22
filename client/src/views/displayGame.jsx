import React, { useEffect } from "react";
import TimerBar from "../component/timerBar";
import UserCirlces from "../component/userCirlces";

const DisplayGame = ({ turn, data }) => {
  let { players, selectedUserId, question } = data;

  const isSelected = selectedUserId == localStorage.userId;

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

  // players = players.slice(0, 2)

  return (
    <>
      <div className="w-full h-full relative flex justify-center items-center">
        <div className="relative w-[500px] h-[500px]">
          <div className="ciclegraph">
            {/* dummy doang */}
            {players.map((player) => {
              return <UserCirlces player={player} selectedUserId={selectedUserId} />;
            })}
          </div>

          <div className="absolute top-1/2 left-1/2 transform ">
            <TimerBar />
            <i className="fa-solid fa-bomb text-[70px] my-5" />
            <h1 className="text-[20px]">
              word: <span className="font-bold">{question}</span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayGame;
