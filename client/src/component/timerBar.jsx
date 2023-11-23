import React, { useState, useEffect } from "react";

function TimerBar({ startTime, duration }) {
  const endTime = startTime + duration;
  const timeLeft = endTime - Date.now();

  const [seconds, setSeconds] = useState();

  useEffect(() => {
    setSeconds(timeLeft);

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1000;
        } else {
          clearInterval(interval); // Hentikan interval jika waktu sudah mencapai 0 detik
          return 0;
        }
      });
    }, 1000);

    // Membersihkan interval setelah komponen unmount atau timer mencapai 0
    return () => clearInterval(interval);
  }, [timeLeft]);

  const timerStyle = {
    width: `${(seconds / duration) * 100}%`, // Menghitung lebar bar sesuai dengan waktu tersisa
    height: "14px",
    backgroundColor: "green",
  };

  return (
    <>
      <div className="timer-container w-[300px]">
        <div className="timer" style={timerStyle}></div>
      </div>
    </>
  );
}

export default TimerBar;
