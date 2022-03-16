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

router.get("/list", async (req, res) => {
  let groupfriendsRepo = new groupfriendsRep();
  let result = await groupfriendsRepo.allGroupFriendsRep(req.body);
  // console.log(result);
  res.send(result);
});
router.post("/list/:id", async (req, res) => {
  let groupfriendsRepo = new groupfriendsRep();
  let result = await groupfriendsRepo.byIdGroupFriendsRep(req.body);
  //console.log(result);
  res.send(result);
});

router.delete("/list/:id", async (req, res) => {
  let groupfriendsRepo = new groupfriendsRep();
  let result = await groupfriendsRepo.deleteByIdGroupFriendsRep(req.body);
  console.log(result);
  res.send(result);
});

router.put("/update", async (req, res) => {
  console.log("in router");
  let groupfriendsRepo = new groupfriendsRep();
  let result = await groupfriendsRepo.UpdateByIdGroupFriendsRep(req.body);
  console.log(result);
  res.send(result);
});

module.exports = router;
