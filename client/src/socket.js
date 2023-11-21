import { io } from "socket.io-client";
// import SERVER from "./constants";

const socket = io("http://localhost:3001");
socket.on("connect", () => console.log(socket.id));
socket.on("connect_error", () => {
  setTimeout(() => socket.connect(), 5000);
});
socket.on("disconnect", () => {console.log("server disconnected")});

export default socket;
