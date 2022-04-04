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
    console.log("in add", user);
    return user;
  }
  async findUserRepo(body) {
    console.log(body.name);
    let result = await this.findUser(body.name);
    if (result == "not found") {
      return "not found";
    }
    return result;
  }
  async getUserByIdRep(body) {
    console.log(body.id);

    let user = await this.getUserByID(body.id);
    return user;
  }

  async getallUserRep() {
    let users = await this.allUser();
    return users;
  }

  async getallUserIdRep() {
    let users = await this.allUserId();
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
  async getUserWithEmailRepo(body) {
    let result = await this.getUserWithEmail(body.email);
    return result;
  }

  // Inside Functions
  async findUser(name) {
    console.log("inside");
    let res = await User.find({ userName: name });

    if (res) {
      console.log(res);
      return res;
    } else {
      console.log(" not fide");
      return "not found";
    }
  }

  async login(email, password) {
    let res = await User.findOne({ emailAdress: email });
    if (res) {
      if (password === res.userPassword) {
        console.log(res.userPassword);
        return res;
      } else {
        return "password no valid";
      }
    } else {
      return "email not foud try agein or register";
    }
  }
  async getUserWithEmail(email) {
    console.log("inside");
    let res = await User.findOne({ emailAdress: email });
    console.log(res);
    return res;
  }

  async allUser() {
    let user = await User.find();
    return user;
  }

  async allUserId() {
    let user = await User.find();
    return user;
  }

  async deleteUserById(id) {
    let user = await User.findByIdAndDelete(id);
    return user.id;
  }

  async addUser(userName, userPassword, emailAdress, profileIMG, newFriendID) {
    User.findOne({ emailAdress: emailAdress }, (err, user) => {
      if (user) {
        console.log("this email ulready register");

        let res = { id: user._id };
        console.log(res);
        return res;
      } else {
        console.log("adding new user");
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
    console.log(id);
    let result = await User.findById(id);
    console.log(result);
    return result;
  }

  // async getUser(id) {
  //   let result = await User.findById(id);
  //   return result.friendsCollectionFK;
  // }
};
