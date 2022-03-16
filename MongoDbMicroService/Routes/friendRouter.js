const express = require("express");
const router = express.Router();
const friendRep = require("../repo/friendRepo");

router.post("/addFriend", async (req, res) => {
  let friend = new friendRep();
  console.log(req.body);
  let result = await friend.addFriendRep(req.body);
  console.log(result);
  res.send(result);
});

router.get("/list", async (req, res) => {
  let friendsRepo = new friendRep();
  let result = await friendsRepo.allFriendRep(req.body);
  console.log(result);
  res.send(result);
});

router.get("/list/:id", async (req, res) => {
  let friendsRepo = new friendRep();
  let result = await friendsRepo.byIdFriendsRep(req.params.id);
  console.log(result);
  res.send(result);
});
router.delete("/list/:id", async (req, res) => {
  let friendsRepo = new friendRep();
  let result = await friendsRepo.byIdFriendsRep(req.params.id);
  console.log(result);
  res.send(result);
});
module.exports = router;
