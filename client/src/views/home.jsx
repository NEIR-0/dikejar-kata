import { useState } from "react";
import PopUpCreate from "../component/popupCreate";
import CardRoom from "../component/roomList";

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
            <CardRoom />
          </div>
        </div>

        {/* craeteroom */}
        {/* <PopUpCreate /> */}
      </section>
    </>
  );
}

export default RoomList;
