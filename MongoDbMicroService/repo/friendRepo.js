const Friend = require("../models/friend");
const container = require("../configContainer");
mongoose = container.resolve("mongoose");

module.exports = class FriendRep {
  //OutSide Function to export Outside
  async addFriendRep(body) {
    console.log(body);
    let friend = await this.addFriend();
    return friend._id;
  }
  async allFriendRep() {
    let friends = await this.allFriends();
    return friends;
  }
  async byIdFriendsRep(body) {
    let friends = await this.byIdFriends(body.id);
    return friends;
  }

  // Inside Functions

  async addFriend() {
    let friend = new Friend({
      friendsCollection: [],
    });
    await friend.save();
    return friend;
  }
  

  async allFriends() {
    let friends = await Friend.find();
    return friends;
  }

  

  async byIdFriends(id) {
    let friends = await Friend.findById(id);
    return friends;
  }

  async deleteByIdFriendsRep(id) {
    let friends = await this.deleteByIdFriends(id);
    return friends;
  }

  async deleteByIdFriends(id) {
    let friends = await Friend.findByIdAndDelete(id);
    return friends;
  }
};
