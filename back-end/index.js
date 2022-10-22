const Koa = require("koa");
const http = require("http");
const socket = require("socket.io");
const cors = require("cors");

const app = new Koa();
const server = http.createServer(app.callback());
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("chat.data", (data) => {
    io.emit("chat.data", data);
  });

  socket.on("chat.users", (data) => {
    data.connections = socket.client.server.eio.clientsCount;
    io.emit("chat.users", data);
  });

  socket.on("chat.leave", (data) => {
    io.emit("chat.leave", data);
  });

  socket.on("chat.url", (urlCode) => {
    io.emit("chat.url", urlCode);
  });
});

server.listen(8080);
