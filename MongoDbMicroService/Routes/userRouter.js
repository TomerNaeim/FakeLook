const express = require("express");
const router = express.Router();
const container = require("../repContainer");
const userRepository = container.resolve('UserRep');
const friendRepository = container.resolve('FriendRepo');


router.post("/addUser", async (req, res) => {
  let newFriendID = await friendRepository.addFriendRep()
  console.log(req.body);
  let result = await userRepository.addUserRep(req.body,newFriendID);
  console.log(result);
  res.send(result);
});

router.post("/getUserById",async(req, res)=>{
 
  let result = await userRepository.getUserByIdRep(req.body)
  res.send(result);
});
router.get("/getAll", async (req, res) => {
  
  let result = await userRepository.getallUserRep(req.body);
  console.log(result);
  res.send(result);
});

router.delete("/delete", async (req, res) => {
  
  let result = await userRepository.deleteByIdFriendsRep(req.body);
  console.log(result);
  res.send(result);
});


module.exports = router;
