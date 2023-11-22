import React, { useState, useEffect } from "react";

function TimerBar() {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          console.log("masuk");
          return prevSeconds - 1;
        } else {
          console.log("berhenti");
          clearInterval(interval); // Hentikan interval jika waktu sudah mencapai 0 detik
          return 0;
        }
      });
    }, 1000);

    // Membersihkan interval setelah komponen unmount atau timer mencapai 0
    return () => clearInterval(interval);
  }, []);

  const timerStyle = {
    width: `${(seconds / 5) * 100}%`, // Menghitung lebar bar sesuai dengan waktu tersisa
    height: "20px",
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
