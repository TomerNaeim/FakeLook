const express = require("express");
const router = express.Router();
const userRep = require("../repo/userRepo");

router.post("/add", async (req, res) => {
  let userrep = new userRep();
  console.log(req.body);
  let result = await userrep.addUserRep(req.body);
  console.log(result);
  res.send(result);
});

module.exports = router;
