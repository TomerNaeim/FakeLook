const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const { response, default: e } = require("express");
const { log } = require("console");

router.post(
  "/signup",
  body("email").isEmail(),
  body("name").isLength({ min: 4 }),
  body("password").isLength({ min: 6 }),

  async (req, res) => {
    const { name, email, password, img } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).json({
        errors: errors.array(),
      });
    } else {
      const ops = {
        userName: name,
        emailAdress: email,
        userPassword: password,
        profileIMG: img,
      };
      let result = await axios.post("http://localhost:5000/user/addUser", ops);
      console.log(result);
    }
  }
);

async function makeToken(id, name, email) {
  const token = await JWT.sign(
    { name, email },
    "nfb32iur32ibfqfvi3vf932bg932g932",
    {
      expiresIn: 360000,
    }
  );
  return token;
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Check if user with email exists
  console.log(email + "__" + password);
  const ops = { email: email, password: password };
  let result = await axios.post("http://localhost:5000/user/login", ops);
  console.log(result.data);
  let userId;
  let tokenMaker = await makeToken(result.data.userName, result.data.email);
  if (result.data.userName != null) {
    console.log(result.data.userName);
    userId = result.data._id;
    res.json({
      message: "welcom",
      id: result.data._id,
      name: result.data.userName,
      email: result.data.emailAdress,
      picture:
        "https://thumbs.dreamstime.com/b/man-wearing-anonymous-mask-mask-well-known-symbol-online-hacktivist-paris-france-january-group-49265924.jpg",
      tokenMaker: tokenMaker,
    });
  } else {
    console.log("llll");
    res.send({ message: "one of the value not match" });
  }

  if (!result) {
    return res.status(422).json({
      errors: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }
  console.log(userId);
});
module.exports = router;
