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

module.exports = router;
