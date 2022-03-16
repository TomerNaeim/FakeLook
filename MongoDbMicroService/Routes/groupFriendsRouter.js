const express = require("express");
const router = express.Router();
const container = require("../repContainer");
const groupFriendRepository = container.resolve("GroupFriendRep");

router.post("/addGroupFriennd", async (req, res) => {
  let result = await groupFriendRepository.addGroupFriendsRep(req.body);
  console.log(result);
  res.send(result);
});

router.get("/getAll", async (req, res) => {
  let result = await groupFriendRepository.allGroupFriendsRep(req.body);
  // console.log(result);
  res.send(result);
});
router.post("/getById", async (req, res) => {
  let result = await groupFriendRepository.byIdGroupFriendsRep(req.body);
  //console.log(result);
  res.send(result);
});

router.delete("/delete", async (req, res) => {
  let result = await groupFriendRepository.deleteByIdGroupFriendsRep(req.body);
  console.log(result);
  res.send(result);
});

router.put("/update", async (req, res) => {
  console.log("in router");

  let result = await groupFriendRepository.UpdateByIdGroupFriendsRep(req.body);
  console.log(result);
  res.send(result);
});

module.exports = router;
