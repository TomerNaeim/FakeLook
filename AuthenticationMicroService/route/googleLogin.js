const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');
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

router.post('/api/google-login', async (req, res) => {
  console.log('here');
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  //check if user exists in system
  // verifie email via mongoservice
  const { name, email, picture } = ticket.getPayload();
  upsert(users, { name, email, picture });
  console.log(users);
  res.status(201);
  res.json({ name, email, picture });
});

module.exports = router;
