const express = require("express");
const router = express.Router();
const userRep = require("../repo/userRepo");
const friendRep = require("../repo/friendRepo");

router.post("/addUser", async (req, res) => {
  let userrep = new userRep();
  let friendRepo = new friendRep();
  let newFriendID = await friendRepo.addFriendRep()
  console.log(req.body);
  let result = await userrep.addUserRep(req.body,newFriendID);
  console.log(result);
  res.send(result);
});

router.post("/getUserById",async(req, res)=>{
  let userrep = new userRep();
  let result = await userrep.getUserByIdRep(req.body)
  res.send(result);
});
router.get("/getAll", async (req, res) => {
  let userrep = new userRep();
  let result = await userrep.getallUserRep(req.body);
  console.log(result);
  res.send(result);
});

router.delete("/delete", async (req, res) => {
  let userrep = new userRep();
  let result = await userrep.deleteByIdFriendsRep(req.body);
  console.log(result);
  res.send(result);
});


module.exports = router;
