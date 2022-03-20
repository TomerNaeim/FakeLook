const express = require("express");
const cors = require("cors");
const PORT = config.get("serverPort.port");
const origin = config.get("serverPort.originAllowed");
const authRouter = require("./route/auth");
const container = require("./configContainer");

const config = container.resolve("config");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: origin,
  })
);

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`server is running on PORT : ${PORT}`);
});
