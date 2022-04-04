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
  async AddToListRepo(body) {
    let friends = await this.AddToList(body.id, body.friend);
    return friends;
  }

  async removeRepo(body) {
    let friends = await this.remove(body.id, body.friend);
    return friends;
  }

  async deleteByIdFriendsRep(body) {
    let friends = await this.deleteByIdFriends(body.id, body.friend);
    return friends;
  }

  async UpdateByIdFriendsRep(body) {
    let friends = await this.UpdateByIdFriends(body.id, body.friendsCollection);
    return friends;
  }

  async byIdFriendsRep(body) {
    console.log(body.id);
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

  async deleteByIdFriends(id) {
    let friends = await Friend.findByIdAndDelete(id);
    return friends;
  }

  async UpdateByIdFriends(id, friendsCollection) {
    let friends = await Friend.updateOne(
      { _id: id },
      {
        friendsCollection: friendsCollection,
      }
    );
    return friends;
  }
  async AddToList(id, friend) {
    let friends = await Friend.findById({ _id: id });
    console.log(friends);
    console.log(id + "__" + friend, +"__" + friends);
    friends.friendsCollection.push(friend);
    await friends.save();
  }
  async remove(id, friend) {
    let friends = await Friend.findById({ _id: id });
    console.log(friends);
    let arr = [];
    for (let index = 0; index < friends.friendsCollection.length; index++) {
      const element = friends.friendsCollection[index];
      if (element != friend) arr.push(element);
    }
    //friends.friendsCollection.filter(friend);
    console.log(arr);
    friends.friendsCollection = arr;
    await friends.save();
  }
};
