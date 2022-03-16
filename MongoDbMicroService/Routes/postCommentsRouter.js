const express = require("express");
const router = express.Router();
const container = require("../repContainer");
const commentsRepository = container.resolve("PostCommentRep");

router.post("/add", async (req, res) => {
  console.log(req.body);
  let result = await commentsRepository.addPostCommentRep(req.body);
  console.log(result);
  res.send(result);
});
router.get("/getAll", async (req, res) => {
  let result = await commentsRepository.allPostCommentRep(req.body);
  console.log(result);
  res.send(result);
});

router.post("/getById", async (req, res) => {
  let result = await commentsRepository.byIdPostCommentRep(req.body);
  console.log(result);
  res.send(result);
});

router.delete("/delete", async (req, res) => {
  let result = await commentsRepository.deleteByIdPostCommentRep(req.body);
  console.log(result);
  res.send(result);
});

router.put("/update", async (req, res) => {
  console.log("route");
  let result = await commentsRepository.UpdateByIdPostCommentRep(req.body);
  console.log(result);
  res.send(result);
});

module.exports = router;
