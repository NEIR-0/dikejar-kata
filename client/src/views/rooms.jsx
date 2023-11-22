import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";
import WaitingRoom from "../component/waitingRoom";
import GamePlay from "../views/gameplay";

function RoomPlayer() {
  const { gameId } = useParams();
  const [data, setData] = useState({
    status: "",
  });
  const [player, setPlayer] = useState("");

  useEffect(() => {
    socket.emit("CLIENT_JOIN", { gameId, access_token: localStorage.access_token });
    socket.on("SERVER_JOINED", (data) => {
      setPlayer(data.data.players);
      setData(data.data);
      console.log("JOINED");
    });

    socket.on("SERVER_STARTED", (data) => {
      setPlayer(data.data.players);
      setData(data.data);

      socket.emit("CLIENT_READY", { gameId });
    });

    socket.on("SERVER_QUESTION", ({question, userId}) => {
      // player dengan userId harus menjawab sebelum event SERVER_TIMEOUT dibawah
      console.log(question, userId);
    }) 

    socket.on("SERVER_TIMEOUT", () => {
      // event ini terjadi jika socket server belum menerima jawaban dari userId menggunakan emit CLIENT_ANSWER
      console.log('timeout');
    })

  }, []);

  return (
    <>
      {data.status === "waiting" && <WaitingRoom data={data} player={player} />}
      {data.status === "playing" && <GamePlay />}
      {/* {data.status === "ended" && <WaitingRoom data={data} player={player} />} */}
    </>
  );
}

export default RoomPlayer;
