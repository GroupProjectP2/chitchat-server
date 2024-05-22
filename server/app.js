"use strict";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = require("./routers/index");
const errHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errHandler);

const httpServer = createServer(app);
//--------------------socket-----------------------------
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", //client domain
    methods: ["GET", "POST"],
  },
});

const users = [];
io.on("connection", (socket) => {
  io.emit("newconnection");
  console.log(`User connected with socketID: ${socket.id}`);
  socket.emit("hello", "Hello from server");

  socket.on("sendMessage", (payload) => {
    console.log({ payload });
    socket.broadcast.emit("newMessage", payload);
  });
  socket.on("hello", (pesan) => {
    console.log({ pesan });
  });

  //-------------------test------
  socket.on('join_room', (roomId)=>{
    socket.join(roomId)
    console.log(`User with ID:${socket.id} joined room: ${roomId}`)
  })
  socket.on('send_message', (messageData) => {
    console.log({messageData})
    socket.to(messageData.room).emit('receive_message',messageData)
  })

//-------------------test------

  socket.on('disconnect', ()=> {
    console.log("User Disconnected, socketID:", socket.id)
  })
});
//--------------------socket-----------------------------



httpServer.listen(port, () => {
  console.clear();
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
