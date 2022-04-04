const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const container = require("../repContainer");
const postRepository = container.resolve("PostRep");

router.post(
  "/addPost",
  body("userUploaded").isLength({ min: 2 }),
  body("picture").isLength({ min: 2 }),
  body("dateUploaded").isLength({ min: 2 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).json({
        errors: errors.array(),
      });
    } else {
      let result = await postRepository.addPostRep(req.body);
      console.log(result);
      res.send(result);
    }
  }
);
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
router.post("/filter", async (req, res) => {
  console.log("inside");
  let result = await postRepository.filterRepo(req.body);
  console.log(result);
  res.send(result);
});
router.post("/getFriendPosts", async (req, res) => {
  console.log("inside");
  let result = await postRepository.getPostsOnlyFriends(req.body);
  console.log(result);
  res.send(result);
});

module.exports = router;
