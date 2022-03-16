const express = require("express");
const router = express.Router();
const PostsRep = require("../repo/postsRepo");

router.post("/addPost", async (req, res) => {
  let rep = new PostsRep();
  //console.log(req.body);
  let result = await rep.addPostRep(req.body);
  console.log(result);
  res.send(result);
});
router.get("/getAll", async (req, res) => {
    let rep = new PostsRep()
    let result = await rep.getAllPostRep(req.body);
    console.log(result);
    res.send(result);
  });
  
  router.delete("/delete", async (req, res) => {
    let rep = new PostsRep()
    let result = await rep.deletePostByIdRep(req.body);
    console.log(result);
    res.send(result);
  });
  router.post("/getById", async (req, res) => {
    let rep = new PostsRep()
    let result = await rep.getPostByIdRep(req.body);
    console.log(result);
    res.send(result);
  });
  router.put("/updateOnePost", async (req, res) => {
    let rep = new PostsRep()
    let result = await rep.updatePostWithIdRep(req.body);
    console.log(result);
    res.send(result);
  });
  router.post("/addLikeById", async (req, res) => {
    let rep = new PostsRep()
    let result = await rep.addLikeByIdRep(req.body);
    console.log(result);
    res.send(result);
  });

  router.post("/addCommentToPost", async (req, res) => {
    let rep = new PostsRep()
    let result = await rep.addCommentToPostWithIdsRep(req.body);
    console.log(result);
    res.send(result);
  });

  

module.exports = router;
