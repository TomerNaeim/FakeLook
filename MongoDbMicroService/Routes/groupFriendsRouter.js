const express = require("express");
const router = express.Router();
const groupfriendsRep = require("../repo/groupFriendsRepo");

router.post("/add", async (req, res) => {
  let groupfriendsRepo = new groupfriendsRep();
  console.log(req.body);
  let result = await groupfriendsRepo.addGroupFriendsRep(req.body);
  console.log(result);
  res.send(result);
});

module.exports = router;
