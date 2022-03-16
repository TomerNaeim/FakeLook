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

router.get("/getAll", async (req, res) => {
  let friendsRepo = new friendRep();
  let result = await friendsRepo.allFriendRep(req.body);
  console.log(result);
  res.send(result);
});

router.post("/list", async (req, res) => {
  //loaclhost3002/friend ,{id:54545454}
  let friendsRepo = new friendRep();
  let result = await friendsRepo.byIdFriendsRep(req.body);
  console.log(result);
  res.send(result);
});
router.delete("/list/:id", async (req, res) => {
  let friendsRepo = new friendRep();
  let result = await friendsRepo.byIdFriendsRep(req.body);
  console.log(result);
  res.send(result);
});

router.put("/update", async (req, res) => {
  let result = await friendsRepo.UpdateByIdFriendsRep(req.body);
  console.log(result);
  res.send(result);
});

module.exports = router;
