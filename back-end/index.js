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
  socket.on("chat.message", (data) => {
    data.connections = socket.client.server.eio.clientsCount;
    io.emit("chat.message", data);
  });
});

server.listen(8080);
