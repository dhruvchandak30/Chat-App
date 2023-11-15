let socket = io();
socket.on("connect", () => {
  console.log("Connected User Successfully to Server");
});
socket.on("disconnect", () => {
  console.log("Disconencted User Successfully to Server");
});

socket.on("newMessage", function (message) {
  console.log("newMessage", message);
});
