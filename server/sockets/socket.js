const { createServer } = require("http");
const { Server } = require("socket.io");
// const { User, Message } = require("./models");
const express = require("express");
const app = express();
const httpServer = createServer(app);
//--------------------socket-----------------------------
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", //client domain
    methods: ["GET", "POST"],
  },
});

const getReceiverSocket = (receiverId) => {
  return userSocket[receiverId];
};

const userSocket = {};

io.on("connection", (socket) => {
  // io.emit("newconnection");
  console.log(`User connected with socketID: ${socket.id}`);
  // socket.emit("hello", "Hello from server");

  const userId = socket.handshake.query.userId;

  if (userId != "undefined") {
    userSocket[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocket));

  //-------------------------socket baru----------------------------
  socket.on("sendMessage", async (payload) => {
    console.log({ payload });

    socket.broadcast.emit("newMessage", payload);
  });
  //-------------------------socket baru----------------------------

  socket.on("disconnect", () => {
    console.log(`User disconnected with socketID: ${socket.id}`);
    delete userSocket[userId];
    io.emit("getOnlineUsers", Object.keys(userSocket));
  });
});

module.exports = { app, io, httpServer, getReceiverSocket };
