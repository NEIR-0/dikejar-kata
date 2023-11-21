import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";
import WaitingRoom from "../component/waitingRoom";
function RoomPlayer() {
  const { gameId } = useParams();
  const [data, setData] = useState("");
  const [player, setPlayer] = useState("");

  useEffect(() => {
    socket.emit("CLIENT_JOIN", { gameId, access_token: localStorage.access_token });
    socket.on("SERVER_JOINED", (data) => {
      // console.log(data.data);
      setPlayer(data.data.players);
      setData(data.data);
    });
  }, []);
  // console.log(data);
  return (
    <>
      {data.status === "waiting" && <WaitingRoom data={data} player={player} />}
      {data.status === "playing" && <WaitingRoom data={data} player={player} />}
      {/* {data.status === "ended" && <WaitingRoom data={data} player={player} />} */}
    </>
  );
}

export default RoomPlayer;
