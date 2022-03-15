const express = require("express");
const router = express.Router();
const userRep = require("../repo/userRepo");

router.post("/addUser", async (req, res) => {
  let userrep = new userRep();
  console.log(req.body);
  let result = await userrep.addUserRep(req.body);
  console.log(result);
  res.send(result);
});

router.post("/getUserById",async(req, res)=>{
  let userrep = new userRep();
  let result = await userrep.getUserByIdRep(req.body)
  res.send(result);
})

module.exports = router;
