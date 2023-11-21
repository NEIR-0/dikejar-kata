import { useState } from "react";

function PopUpCreate() {
  return (
    <>
      {/* form create room */}
      <div className="w-full h-screen bg-red-400 z-20 fixed left-0 top-0 flex justify-center items-center flex-col">
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
      </div>
    </>
  );
}

export default PopUpCreate;
