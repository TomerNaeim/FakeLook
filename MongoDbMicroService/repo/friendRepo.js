const Friend = require("../models/friend");
const container = require("../configContainer");
mongoose = container.resolve("mongoose");

module.exports = class FriendRep {
  //OutSide Function to export Outside
  async addFriendRep(body) {
    console.log(body);
    let friend = await this.addFriend(body.friendsCollection);
    return friend;
  }

  // Inside Functions

  async addFriend(friendsCollection) {
    let friend = new Friend({
      friendsCollection: friendsCollection[""],
    });
    await friend.save();
    return friend;
  }
  async allFriendRep() {
    let friends = await this.allFriends();
    return friends;
  }

  async allFriends() {
    let friends = await Friend.find();
    return friends;
  }

  async byIdFriendsRep(id) {
    let friends = await this.byIdFriends(id);
    return friends;
  }

  async byIdFriends(id) {
    let friends = await friends.findById(id);
    return friends;
  }
};
