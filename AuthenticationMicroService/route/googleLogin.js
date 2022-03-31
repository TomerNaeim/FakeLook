const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');
const { default: axios } = require('axios');

const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const GOOGLE_CLIENT_ID = 
"378037402068-hnpf4gt6obl7o2nvdqf3fmfoc55u34qv.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET="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"


dotenv.config();
const client = new OAuth2Client(GOOGLE_CLIENT_ID);


const router = express.Router();
router.use(express.json());

const users = [];

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}
async function makeToken (id,name,email){
    const token = await JWT.sign({name,email }, "nfb32iur32ibfqfvi3vf932bg932g932", {
         expiresIn: 360000,
        });
        return token;
}


router.post('/api/google-login', async (req, res) => {
  console.log('here');
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  console.log(ticket);

  //check if user exists in system
  // verifie email via mongoservice
  const { name, email, picture } = ticket.getPayload();
  const ops = {
    userName: name,
    emailAdress: email,
    userPassword : "12345",
    profileIMG: picture,
  };
  let result = await axios.post("http://localhost:5000/user/addUser", ops);
  console.log(result);
  upsert(users, { name, email, picture });
 let tokenMaker =await makeToken(name,email);
  console.log(users);
  res.status(201);
  res.json({ name, email, picture ,tokenMaker});
});

module.exports = router;
