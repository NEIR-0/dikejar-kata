import { useEffect } from "react";
import { useState } from "react";
import PopUpCreate from "../component/popupCreate";
import CardRoom from "../component/roomList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RoomList() {
  const [room, setRoom] = useState([]);
  const [show, setShow] = useState(false);
  const popUpCreate = () => {
    setShow(true);
  };

  useEffect(() => {
    listRoom();
  }, []);

  const listRoom = async (e) => {
    try {
      const { data } = await axios.get("http://localhost:3000/games", {
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      console.log(data.games);
      setRoom(data.games);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="w-full h-fit relative">
        <div className="p-5 flex justify-center">
          {/* search */}
          <form className="flex absolute top-[13%]">
            <input className="px-5 py-2 w-[400px] rounded-s-md" type="text" />
            <button className="px-3 py-2 bg-slate-600 text-white">
              <i class="fa-solid fa-magnifying-glass fa-rotate-90"></i>
            </button>
          </form>

          {/* create room */}
          <button onClick={popUpCreate} className="absolute top-[13%] right-20 px-3 py-2 bg-white">
            <i class="fa-solid fa-plus"></i>
          </button>

          {/* list */}
          <div className="mt-[10%] w-full h-fit p-2 flex flex-wrap justify-center">
            {room &&
              room.map((el) => {
                return <CardRoom key={el.id} data={el} />;
              })}
          </div>
        </div>

        {/* craeteroom */}
        {show === true ? <PopUpCreate /> : ""}
      </section>
    </>
  );
}

export default RoomList;
