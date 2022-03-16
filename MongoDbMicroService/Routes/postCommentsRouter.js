const express = require("express");
const router = express.Router();
const commentRep = require("../repo/postCommentsRepo");

router.post("/add", async (req, res) => {
  let commentRepo = new commentRep();
  console.log(req.body);
  let result = await commentRepo.addPostCommentRep(req.body);
  console.log(result);
  res.send(result);
});
router.get("/list", async (req, res) => {
  let commentRepo = new commentRep();
  let result = await commentRepo.allPostCommentRep(req.body);
  console.log(result);
  res.send(result);
});

router.get("/list", async (req, res) => {
  let result = await commentRepo.byIdPostCommentRep(req.body);
  console.log(result);
  res.send(result);
});

router.delete("/list/:id", async (req, res) => {
  let result = await commentRepo.deleteByIdPostCommentRep(req.body);
  console.log(result);
  res.send(result);
});

router.put("/update", async (req, res) => {
  console.log("route");
  let result = await commentRepo.UpdateByIdPostCommentRep(req.body);
  console.log(result);
  res.send(result);
});

module.exports = router;
