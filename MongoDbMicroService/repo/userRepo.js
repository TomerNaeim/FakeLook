const User = require("../models/user");
const container = require("../configContainer");
mongoose = container.resolve("mongoose");

module.exports = class UserRep {
  //OutSide Function to export Outside
  async addUserRep(body, newFriendID) {
    // console.log(newFriendID);
    let user = await this.addUser(
      body.userName,
      body.userPassword,
      body.emailAdress,
      body.profileIMG,
      newFriendID
    );
    return user;
  }
  async getUserByIdRep(body) {
    let user = await this.getUserByID(body.id);
    return user;
  }
  async getallUserRep() {
    let users = await this.allUser();
    return users;
  }

  async deleteByIdFriendsRep(id) {
    let user = await this.deleteUserById(id);
    return user;
  }

  async loginRepo(body) {
    let result = await this.login(body.email, body.password);
    return result;
  }

  // Inside Functions

  async login(email, password) {
    let res = await User.findOne({ emailAdress: email });
    if (res) {
      if (password === res.userPassword) {
        console.log(res.userPassword);
        return res;
      } else {
        console.log("password no valid");
      }
    }
  }

  async allUser() {
    let user = await User.find();
    return user;
  }

  async deleteUserById(id) {
    let user = await User.findByIdAndDelete(id);
    return user;
  }

  async addUser(userName, userPassword, emailAdress, profileIMG, newFriendID) {
    User.findOne({ emailAdress: emailAdress }, (err, user) => {
      if (user) {
        return "this email ulready register";
      } else {
        let user = new User({
          userName: userName,
          userPassword: userPassword,
          emailAdress: emailAdress,
          profileIMG: profileIMG,
          friendsCollectionFK: newFriendID,
        });
        user.save();
        return user;
      }
    });
  }
  async getUserByID(id) {
    let result = await User.findById(id);
    return result;
  }
};
