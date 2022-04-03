const express = require("express");
const router = express.Router();
const container = require("../repContainer");
const userRepository = container.resolve("UserRep");
const friendRepository = container.resolve("FriendRepo");

router.post("/addUser", async (req, res) => {
  let newFriendID = await friendRepository.addFriendRep();
  console.log(req.body);
  let result = await userRepository.addUserRep(req.body, newFriendID);
  console.log(result);
  res.send(result);
});

router.post("/getUserById", async (req, res) => {
  console.log(req.body);

  let result = await userRepository.getUserByIdRep(req.body);
  res.send(result);
});
router.post("/getUserByEmail", async (req, res) => {
  let result = await userRepository.getUserWithEmailRepo(req.body);
  res.send(result);
});
router.get("/getAll", async (req, res) => {
  let result = await userRepository.getallUserRep(req.body);
  // console.log(result);
  res.send(result);
});
router.get("/getAllById", async (req, res) => {
  let result = await userRepository.getallUserIdRep(req.body);
  // console.log(result);
  res.send(result);
});

router.delete("/delete", async (req, res) => {
  let result = await userRepository.deleteByIdFriendsRep(req.body);
  console.log(result);
  res.send(result);
});
router.post("/findone", async (req, res) => {
  let result = await userRepository.findUserRepo(req.body);
  if (result == "not found") res.send("not found");
  res.send(result);
});

router.post("/login", async (req, res) => {
  let result = await userRepository.loginRepo(req.body);
  console.log(result);
  res.send(result);
});

module.exports = router;

/*

const list = [{ id: 1, name: '1'}, { id: 1, name: '1'}, { id: 1, name: '1'}, { id: 1, name: '1'}]
list.find()

const map = {
  '1': { id: 1, name: '1'},
  '2': { id: 1, name: '1'},
  '3': { id: 1, name: '1'},
  '4': { id: 1, name: '1'}
}

if(map['3'])

*/
