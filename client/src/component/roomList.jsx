import { useState } from "react";

function CardRoom() {
  return (
    <>
      <div className="w-[400px] h-[250px] bg-white flex justify-center items-center flex-col m-2">
        <h1 className="text-[40px]">title</h1>
        <h1 className="text-[40px]">bahasa</h1>
        <button className="px-24 py-2 bg-lime-300 mt-5">Join</button>
      </div>
    </>
  );
}

export default CardRoom;
