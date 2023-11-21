const express= require('express')
const socketIo = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 3000;
const app = express()
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
}); //in case server and client run on different urls
io.on("connection", (socket) => {
  console.log("client connected: ", socket.id);

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
});

app.io = io

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
