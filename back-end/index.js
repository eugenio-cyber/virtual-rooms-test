const Koa = require("koa");
const app = new Koa();
const server = require("http").createServer(app.callback());
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("set_username", (username) => {
    socket.data.username = username;
  });

  socket.on("chat_update", (message) => {
    io.emit("receive_message", {
      message,
      user_id: socket.id,
      username: socket.data.username,
    });
  });

  socket.on("update_url", (url) => {
    io.emit("receive_url", url);
  });
});

server.listen(8080, console.log("Server is running..."));
