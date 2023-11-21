import { useState } from "react";

function RoomList() {
  return (
    <>
      <section className="w-full h-fit bg-purple-500   relative">
        <div className="p-5 flex justify-center">
          {/* search */}
          <form className="flex absolute top-[13%]">
            <input className="px-5 py-2 w-[400px]" type="text" />
            <i class="fa-solid fa-magnifying-glass fa-rotate-90"></i>
          </form>

          {/* create room */}
          <button className="absolute top-[13%] right-20 px-3 py-2 bg-white">
            <i class="fa-solid fa-plus"></i>
          </button>

          {/* list */}
          <div className="mt-[10%] w-full h-fit bg-yellow-300 p-2 flex flex-wrap justify-center">
            <div className="w-[400px] h-[250px] bg-white flex justify-center items-center flex-col m-2">
              <h1 className="text-[40px]">title</h1>
              <h1 className="text-[40px]">bahasa</h1>
              <button className="px-24 py-2 bg-lime-300 mt-5">Join</button>
            </div>
            <div className="w-[400px] h-[250px] bg-white flex justify-center items-center flex-col m-2">
              <h1 className="text-[40px]">title</h1>
              <h1 className="text-[40px]">bahasa</h1>
              <button className="px-24 py-2 bg-lime-300 mt-5">Join</button>
            </div>
            <div className="w-[400px] h-[250px] bg-white flex justify-center items-center flex-col m-2">
              <h1 className="text-[40px]">title</h1>
              <h1 className="text-[40px]">bahasa</h1>
              <button className="px-24 py-2 bg-lime-300 mt-5">Join</button>
            </div>
          </div>
        </div>

        {/* form create room */}
        {/* <div className="w-full h-screen bg-red-400 z-20 fixed left-0 top-0 flex justify-center items-center flex-col">
          <h1 className="text-[50px] text-center">create rooms</h1>
          <form className="bg-blue-500 p-10">
            <ul>
              <li className="flex flex-col">
                <label htmlFor="">title</label>
                <input type="text" name="title" />
              </li>
              <li className="mt-4">
                <select className="w-full" name="" id="">
                  <option value="">Selecet bahasa</option>
                  <option value="indonesia">Indonesia</option>
                  <option value="english">english</option>
                </select>
              </li>
            </ul>
          </form>
        </div> */}
      </section>
    </>
  );
}

export default RoomList;
