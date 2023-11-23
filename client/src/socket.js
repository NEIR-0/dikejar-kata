import { io } from "socket.io-client";
// import SERVER from "./constants";

// const socket = io("https://dikejar-kata-socket.asmodaycelestia.online");
const socket = io("http://localhost:3001"); // local
socket.on("connect", () => console.log(socket.id));
socket.on("connect_error", () => {
  setTimeout(() => socket.connect(), 5000);
});
socket.on("disconnect", () => {
  console.log("server disconnected");
});

export default socket;
