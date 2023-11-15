const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "/../public");
console.log(publicPath);
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));
io.on("connection", (socket) => {
  console.log("A new User Connected");
  //  Whenever a user enters the room he will be showed this message.
  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to The Chat app",
    createdAt: new Date().getTime(),
  });
  //  A new user joined, showed to everyone except the user himself.
  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "New User Joined",
    createdAt: new Date().getTime(),
  });

  socket.on("createMessage", (message) => {
    console.log("Create Message", message);
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime(),
    });
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
});
