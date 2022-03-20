const express = require("express");
const cors = require("cors");

const facebookRouter = require("./route/authFacebook");
const googleRouter = require("./route/authGoogle");
const authRouter = require("./route/auth");
const container = require("./configContainer");
const config = container.resolve("config");
const PORT = config.get("serverPort.port");
const origin = config.get("serverPort.originAllowed");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: origin,
  })
);
app.use("/authGoogle", googleRouter);
app.use("/auth", authRouter);
app.use("/authFacebook", facebookRouter);

app.listen(PORT, () => {
  console.log(`server is running on PORT : ${PORT}`);
});

app.get('/authLogoGoogle', (req,res)=>{
  res.send('<a href="/authGoogle/google">Authenticate with Google</a>');
})
