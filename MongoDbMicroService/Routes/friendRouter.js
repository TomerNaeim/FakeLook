const express = require("express");
const router = express.Router();
const container = require("../repContainer");
const FriendRepository = container.resolve("FriendRepo");

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

router.post("/getById", async (req, res) => {
  //loaclhost3002/friend ,{id:54545454}

  let result = await FriendRepository.byIdFriendsRep(req.body);
  console.log(result);
  res.send(result);
});
router.delete("/delete", async (req, res) => {
  let result = await FriendRepository.deleteByIdFriendsRep(req.body);
  console.log(result);
  res.send(result);
});

router.put("/update", async (req, res) => {
  let result = await FriendRepository.UpdateByIdFriendsRep(req.body);
  console.log(result);
  res.send(result);
});

router.post("/addToList", async (req, res) => {
  console.log("router list");
  let result = await FriendRepository.AddToListRepo(req.body);
  console.log(result);
  res.send(result);
});
router.post("/remove", async (req, res) => {
  console.log("router list");
  let result = await FriendRepository.removeRepo(req.body);
  console.log(result);
  res.send(result);
});

module.exports = router;

//mongo
/*
  [1, 2, 3, 4, 5, 6, 7]
*/

/*
[8, 9, 1, 34, 55]
8
*/
