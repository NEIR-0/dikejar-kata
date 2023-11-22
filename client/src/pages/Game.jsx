import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../socket";
import WaitingRoom from "../component/waitingRoom";
import GamePlay from "../views/gameplay";

function Game() {
  const [data, setData] = useState({
    status: "",
  });
  const [player, setPlayer] = useState("");
  const [gamePlayers, setGamePlayers] = useState("");
  const [status, setStatus] = useState("waiting");

  const { gameId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("CLIENT_JOIN", { gameId, access_token: localStorage.access_token });
    socket.on("SERVER_JOINED", (data) => {
      if (data.status === "ended") {
        return navigate(`/games/${gameId}/winner`);
      }

      console.log(data);

      setPlayer(data.data.players);
      setData(data.data);
      setStatus(data.data.status);
    });

    socket.on("SERVER_STARTED", (data) => {
      setData(data.data);
      setGamePlayers(data.data.playersOrder);

      setStatus("playing");
      socket.emit("CLIENT_READY", { gameId });
    });

    // gameover
    socket.on("SERVER_GAMEOVER", (data) => {
      return navigate(`/games/${gameId}/winner`);
    });

    return () => {
      socket.off("CLIENT_JOIN");
      socket.off("SERVER_JOINED");
      socket.off("SERVER_STARTED");
      socket.off("SERVER_GAMEOVER");
    };

    // socket.on("SERVER_QUESTION", ({ question, userId }) => {
    //   // player dengan userId harus menjawab sebelum event SERVER_TIMEOUT dibawah
    //   console.log(question, userId);
    // });

    // socket.on("SERVER_TIMEOUT", () => {
    //   // event ini terjadi jika socket server belum menerima jawaban dari userId menggunakan emit CLIENT_ANSWER
    //   console.log("timeout");
    // });
  }, []);

  return (
    <>
      {status === "waiting" && <WaitingRoom data={data} player={player} />}
      {status === "playing" && <GamePlay />}
    </>
  );
}

export default Game;
