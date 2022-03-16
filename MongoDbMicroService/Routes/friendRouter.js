const express = require("express");
const router = express.Router();
const container = require("../repContainer");
const FriendRepository = container.resolve('FriendRepo');


router.post("/addFriend", async (req, res) => {
  
  let result = await FriendRepository.addFriendRep(req.body);
  console.log(result);
  res.send(result);
});

router.get("/getAll", async (req, res) => {
 
  let result = await FriendRepository.allFriendRep(req.body);
  console.log(result);
  res.send(result);
});

router.post("/list", async (req, res) => {
  //loaclhost3002/friend ,{id:54545454}
  
  let result = await FriendRepository.byIdFriendsRep(req.body);
  console.log(result);
  res.send(result);
});
router.delete("/list/:id", async (req, res) => {
  
  let result = await FriendRepository.byIdFriendsRep(req.body);
  console.log(result);
  res.send(result);
});

router.put("/update", async (req, res) => {
  let result = await FriendRepository.UpdateByIdFriendsRep(req.body);
  console.log(result);
  res.send(result);
});

module.exports = router;
