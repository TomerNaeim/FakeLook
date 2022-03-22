const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const { response, default: e } = require("express");

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

    // let user = users.find((user) => {
    //   return user.email === email;
    // });

    //if (user) {
    //  return res.status(422).json({
    //    errors: [
    //      {
    //        msg: "This user already exists",
    //      },
    //    ],
    //  });
    //}

    // const hashedPassword = await bcrypt.hash(userPassword, 10);
    //
    // users.push({
    //   userPassword: hashedPassword,
    // });

    // const token = await JWT.sign("nfb32iur32ibfqfvi3vf932bg932g932", {
    //   expiresIn: 360000,
    // });
    //
    // res.json({
    //   token,
    // });
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Check if user with email exists
  console.log(email + "__" + password);
  const ops = { email: email, password: password };
  let result = await axios.post("http://localhost:5000/user/login", ops);
  console.log(result.data);
  // let user = users.find((user) => {
  //   return user.email === email;
  // });
  if (result.data.userName != null) {
    console.log(result.data.userName);
    res.send({ message: "welcom" });
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

  // Check if the password if valid
  //let isMatch = await bcrypt.compare(result.data.password);
  //
  //if (!isMatch) {
  //  return res.status(404).json({
  //    errors: [
  //      {
  //        msg: "Invalid Credentials",
  //      },
  //    ],
  //  });
  //}

  // Send JSON WEB TOKEN
  //const token = await JWT.sign({ email }, "nfb32iur32ibfqfvi3vf932bg932g932", {
  //  expiresIn: 360000,
  //});

  // res.json({
  //   token,
  // });
});
module.exports = router;
