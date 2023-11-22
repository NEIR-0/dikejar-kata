import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../socket";
import WaitingRoom from "../component/waitingRoom";
import GamePlay from "../views/gameplay";
import Swal2 from "sweetalert2";

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
      return navigate(`/games/${gameId}/result`);
      }

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

    socket.on("SERVER_RESULT", () => {
      console.log("SERVER RESULT");
      return navigate(`/games/${gameId}/result`);
    });

    socket.on("SERVER_ERROR", (error) => {
      Swal2.fire({
        title: "Error",
        text: error || "Something gone wrong",
        icon: "error",
      }).then((result) => {
        return navigate("/");
      });
    });

    return () => {
      socket.off("SERVER_JOINED");
      socket.off("SERVER_STARTED");
      socket.off("SERVER_RESULT");
      socket.off("SERVER_ERROR");
    };
  }, []);

  return (
    <>
      {status === "waiting" && <WaitingRoom data={data} player={player} />}
      {status === "playing" && <GamePlay />}
    </>
  );
}

export default Game;
