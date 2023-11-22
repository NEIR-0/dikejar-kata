import { useState } from "react";
import { Link } from "react-router-dom";

function Winner({ winner }) {
  return (
    <>
      <section className="w-full h-screen bg-purple-500 flex justify-center items-center relative">
        <div className="w-[30%] h-fit p-10 rounded-lg bg-white flex justify-center items-center flex-col">
          <h1 className="text-[40px]">winner is ..</h1>
          <i className="fa-solid fa-user text-[100px] mt-12" />
          {/* <h1 className="text-[50px]">{winner && winner.username}</h1> */}
          <h1 className="text-[40px]">username</h1>
        </div>

        <Link to="/" className="px-10 py-2 bg-white fixed right-10 bottom-10">
          back
        </Link>
      </section>
    </>
  );
}

export default Winner;
