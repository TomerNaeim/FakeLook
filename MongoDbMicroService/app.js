const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");

const container = require("./configContainer");

const config = container.resolve("config");
const userRouter = require("./Routes/userRouter");
const postRouter = require("./Routes/postsRouter");
const groupF = require("./Routes/groupFriendsRouter");
const postComment = require("./Routes/postCommentsRouter");
const friendRouter = require("./Routes/friendRouter");
const PORT = config.get("serverPort.port");
const origin = config.get("serverPort.originAllowed");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./api.yaml");
const logger = require("./logger.js");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.use("/friend", friendRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/groupFriends", groupF);
app.use("/postComment", postComment);

const expressServer = app.listen(PORT, () => {
  logger.info(`server is running on PORT : ${PORT}`);
});
const io = socketio(expressServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  // console.log(socket.id);

  socket.on("sendMessage", (data) => {
    console.log(`ddd ${data}`);
    socket.broadcast.emit("message", data);
  });
  // socket.on("messageToServer", (dataFromClient) => {
  //   console.log(dataFromClient);

  // });
});
