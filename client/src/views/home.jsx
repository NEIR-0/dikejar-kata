import { useEffect } from "react";
import { useState } from "react";
import CardRoom from "../component/roomList";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LogoutBtn from "../component/logout";

function RoomList() {
  const navigate = useNavigate();
  const [room, setRoom] = useState([]);

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
      // console.log(data.games);
      setRoom(data.games);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/register");
  };

  return (
    <>
      <section className="w-full h-fit relative">
        <LogoutBtn logout={logout} />
        <div className="p-5 flex justify-center">
          {/* search */}
          <form className="flex absolute top-[13%]">
            <input className="px-5 py-2 w-[400px] rounded-s-md" type="text" />
            <button className="px-3 py-2 bg-slate-600 text-white">
              <i className="fa-solid fa-magnifying-glass fa-rotate-90"></i>
            </button>
          </form>

          {/* create room */}
          <Link to="/createRoom" className="absolute top-[13%] right-20 px-3 py-2 bg-white">
            <i className="fa-solid fa-plus"></i>
          </Link>

          {/* list */}
          <div className="mt-[10%] w-full h-fit p-2 flex flex-wrap justify-center">
            {room &&
              room.map((el) => {
                return <CardRoom key={el.id} data={el} />;
              })}
          </div>
        </div>
      </section>
    </>
  );
}

export default RoomList;
