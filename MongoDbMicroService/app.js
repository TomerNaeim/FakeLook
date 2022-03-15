const express = require("express");
const cors = require("cors");
const container = require("./configContainer");

const config = container.resolve("config");
const userRouter = require("./Routes/userRouter");
const postRouter = require("./Routes/postsRouter")

const PORT = config.get("serverPort.port");
const origin = config.get("serverPort.originAllowed");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: origin,
  })
);
app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(PORT, () => {
  console.log(`server is running on PORT : ${PORT}`);
});
