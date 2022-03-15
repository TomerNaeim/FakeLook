const express = require("express");
const cors = require("cors");
const container = require("./configContainer");

const config = container.resolve("config");
const userRouter = require("./Routes/userRouter");
const postRouter = require("./Routes/postsRouter");
const groupF = require("./Routes/groupFriendsRouter");
const postComment = require("./Routes/postCommentsRouter");
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
app.use("/groupFriends", groupF);
app.use("/postComment", postComment);

app.listen(PORT, () => {
  console.log(`server is running on PORT : ${PORT}`);
});


//Update in MongoDb
// async updateCompany(id,companyName
//     ) {
        
//         await Company.updateOne({_id:id},{
//             companyName :companyName
//         });
//     }