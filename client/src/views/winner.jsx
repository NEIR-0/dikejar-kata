import { useState } from "react";

function Winner() {
  return (
    <>
      <section className="w-full h-screen bg-purple-500 flex justify-center items-center relative">
        <div className="w-[30%] h-[300px] bg-white flex justify-center items-center flex-col">
          <h1 className="text-[50px]">winner is ..</h1>
          <h1 className="text-[50px]">User</h1>
        </div>

        <button className="px-10 py-2 bg-white fixed right-10 bottom-10">back</button>
      </section>
    </>
  );
}

export default Winner;
