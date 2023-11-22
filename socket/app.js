const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const axios = require("axios");
const { getRandomWord, verifyWord } = require("./helper/questions");

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

  static createRoom(roomId, language, players) {
    this.rooms.push(new Room(roomId, language, players));
  }

  constructor(roomId, language, players) {
    this.roomId = roomId;
    this.language = language;

    this.players = players;
    this.players.forEach((player) => (player.isDefeated = false));

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

    if (this.playerReadyCount >= this.players.length / 2) {
      this.startGame();
    }

    // todo: comment this
    this.startGame();
  }

  startGame() {
    if (!this.isGameStarted) {
      const randomIndex = Math.floor(Math.random() * this.players.length);

      this.currentIndex = randomIndex;
      this.question();
    }
  }

  question() {
    const question = getRandomWord(this.language);
    this.currentQuestion = question;

    const selectedUserId = this.players[this.currentIndex].id;
    this.currentUserId = selectedUserId;
    this.currentDuration = 5000;

    io.to(this.roomId).emit("SERVER_QUESTION", {
      question,
      selectedUserId,
      selectedIndex: this.currentIndex,
      players: this.players,
      startTime: Date.now(),
      duration: this.currentDuration,
    });

    this.timeout = setTimeout(() => {
      console.log("timeout");
      this.timesUp();
    }, this.currentDuration);
  }

  timesUp() {
    // this.players[this.currentIndex].isDefeated = true;
    io.to(this.roomId).emit("SERVER_TIMEOUT");

    this.players[this.currentIndex].isDefeated = true;

    this.nextTurn();
  }

  answer(userId, answer) {
    if (userId === this.currentUserId) {
      if (verifyWord(answer)) {
        io.to(this.roomId).emit("SERVER_CORRECT", { userId, answer });
        clearTimeout(this.timeout);

        this.nextTurn();
      }
    }
  }

  nextTurn() {
    let nextIndex = this.currentIndex + 1;
    if (nextIndex >= this.players.length) nextIndex = 0;

    while (this.players[nextIndex]?.isDefeated) {
      nextIndex++;
    }

    this.currentIndex = nextIndex;
    console.log(nextIndex, "<<<<");

    // todo check how many players left
    this.question();
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

      const { language, players } = data.data;

      const selectedRoom = Room.getRoom(gameId);
      if (selectedRoom) {
        selectedRoom.players = players;
      } else {
        Room.createRoom(gameId, language, players);
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
