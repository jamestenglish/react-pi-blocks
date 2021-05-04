const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const spawn = require("child_process").spawn;

const { handleFiles } = require("./handleFiles");

app.use(express.static("./build"));

const sh = spawn("bash");

sh.stdout.on("data", function (data) {
  console.log({ stdout: data });
  io.emit("message", data);
});

sh.stderr.on("data", function (data) {
  console.log({ stderr: data });
  io.emit("message", data);
});

sh.on("exit", function (code) {
  console.log({ exit: code });
  io.emit("exit", "** Shell exited: " + code + " **");
});

io.on("connection", function (client) {
  client.on("message", function (data) {
    console.log({ onMessage: data });
    sh.stdin.write(data + "\n");
    io.emit("message", new Buffer("> " + data));
  });
  handleFiles(io, client);
});

server.listen(8080, function () {
  console.log("server started");
});
