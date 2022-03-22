const express = require("express");
const router = express.Router();
const container = require("../repContainer");
const postRepository = container.resolve("PostRep");

router.post("/addPost", async (req, res) => {
  let result = await postRepository.addPostRep(req.body);
  console.log(result);
  res.send(result);
});
router.get("/getAll", async (req, res) => {
  let result = await postRepository.getAllPostRep(req.body);
  console.log(result);
  res.send(result);
});

router.delete("/delete", async (req, res) => {
  let result = await postRepository.deletePostByIdRep(req.body);
  console.log(result);
  res.send(result);
});
router.post("/getById", async (req, res) => {
  let result = await postRepository.getPostByIdRep(req.body);
  console.log(result);
  res.send(result);
});
router.put("/updateOnePost", async (req, res) => {
  let result = await postRepository.updatePostWithIdRep(req.body);
  console.log(result);
  res.send(result);
});
router.post("/addLikeById", async (req, res) => {
  let result = await postRepository.addLikeByIdRep(req.body);
  console.log(result);
  res.send(result);
});

router.post("/addCommentToPost", async (req, res) => {
  let result = await postRepository.addCommentToPostWithIdsRep(req.body);
  console.log(result);
  res.send(result);
});

module.exports = router;
