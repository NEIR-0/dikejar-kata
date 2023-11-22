const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const axios = require("axios");
// const { getRandomWord, verifyWord } = require("./helper/questions");

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
  },
}); //in case server and client run on different urls

// module.exports = io

class Room {
  static rooms = [];

  static getRoom(id) {
    for (const room of this.rooms) {
      if (room.roomId === id) return room;
    }

    return false;
  }

  static createRoom(roomId, player_ids) {
    this.rooms.push(new Room(roomId, player_ids));
  }

  constructor(roomId, player_ids, language) {
    this.roomId = roomId;
    this.language = language;
    this.player_ids = player_ids;

    // waiting stage
    this.isGameStarted = false;
    this.playerReadyCount = 0;

    // playing stage
    this.currentIndex;
    this.currentQuestion;
    this.currentUserId;
    this.timeout = null;
  }

  waitPlayers() {}

  playerReady() {
    this.playerReadyCount++;

    if (this.playerReadyCount >= this.player_ids.length / 2) {
      this.startGame();
    }
  }

  startGame() {
    console.log("started");

    if (!this.isGameStarted) {
      const randomIndex = Math.floor(Math.random() * this.player_ids.length);

      this.currentIndex = randomIndex;
      this.question();
    }
  }

  question() {
    // const question = getRandomWord(this.language);
    const question = "abc";
    this.currentQuestion = question;

    const selectedUserId = this.player_ids[this.currentIndex];
    this.currentUserId = selectedUserId;

    io.to(this.roomId).emit("SERVER_QUESTION", { question, selectedUserId });

    let nextIndex = this.currentIndex++;
    if (nextIndex >= this.player_ids.length) nextIndex = 0;
    this.currentIndex = nextIndex;

    this.timeout = setInterval(() => {
      console.log("timeout");
      this.timesUp();
    }, 5000);
  }

  timesUp() {
    io.to(this.roomId).emit("SERVER_TIMEOUT");
  }

  answer(userId, answer) {
    if (userId === this.currentUserId) {
      if (verifyWord(answer)) {
        io.to(this.roomId).emit("SERVER_CORRECT", { userId, answer });
        clearTimeout(this.timeout);
      }
    }
  }
}

io.on("connection", (socket) => {
  console.log("client connected: ", socket.id);

  socket.on("CLIENT_JOIN", async (params) => {
    const { gameId, access_token } = params;

    try {
      const { data } = await axios.get("http://localhost:3000/games/" + gameId, {
        headers: {
          authorization: "Bearer " + access_token,
        },
      });

      const { player_ids, language } = data.data;

      const selectedRoom = Room.getRoom(gameId);
      if (selectedRoom) {
        selectedRoom.player_ids = player_ids;
      } else {
        Room.createRoom(gameId, player_ids, language);
      }

      socket.join(gameId);
      io.to(gameId).emit("SERVER_JOINED", data);
    } catch (error) {
      // room penuh
      console.log(error);
    }
  });

  socket.on("CLIENT_START", async (params) => {
    const { gameId, access_token } = params;
    try {
      const { data } = await axios.get(`http://localhost:3000/games/${gameId}/start`, {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      });

      io.to(gameId).emit("SERVER_STARTED", { data });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("CLIENT_READY", (params) => {
    console.log("CLIENT_READY");
    const { gameId } = params;

    const selectedRoom = Room.getRoom(gameId);
    selectedRoom.playerReady();
  });

  socket.on("CLIENT_ANSWER", (params) => {
    const { gameId, userId, answer } = params;

    const selectedRoom = Room.getRoom(gameId);
    selectedRoom.answer(userId, answer);
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
});

app.io = io;

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
