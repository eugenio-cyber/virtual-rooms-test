const Koa = require("koa");
const http = require("http");
const socket = require("socket.io");
const cors = require("cors");
let db = require("./db");

const app = new Koa();
const server = http.createServer(app.callback());
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("chat.update", (data) => {
    db = { ...data };
    io.emit("chat.update", db);
  });

  socket.on("chat.leave", () => {
    db.connections--;
    io.emit("chat.leave", db);
  });

  socket.on("chat.open", () => {
    db.connections++;
    io.emit("chat.open", db);
  });

  socket.on("chat.url", (urlCode) => {
    io.emit("chat.url", urlCode);
  });
});

server.listen(8080);
