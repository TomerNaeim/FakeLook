const GroupFriend = require("../models/friendGroups");
const container = require("../configContainer");
mongoose = container.resolve("mongoose");

module.exports = class GroupFriends {
  //OutSide Function to export Outside
  async addGroupFriendsRep(body) {
    console.log(body);
    let groupFriend = await this.addGroupFriends(
      body.groupName,
      body.friendsGroup
    );
    return groupFriend;
  }

  async deleteByIdGroupFriendsRep(body) {
    let groupFriend = await this.deleteByIdGroupFriends(body.id);
    return groupFriend;
  }

  async UpdateByIdGroupFriendsRep(body) {
    console.log("here");
    let groupFriend = await this.UpdateByIdGroupFriends(
      body.id,
      body.groupName,
      body.friendsGroup
    );
    return groupFriend;
  }

  async allGroupFriendsRep() {
    let groupFriend = await this.allGroupFriends();
    return groupFriend;
  }
  async byIdGroupFriendsRep(body) {
    let groupFriend = await this.byIdGroupFriends(body.id);
    return groupFriend;
  }

  // Inside Function

  async allGroupFriends() {
    let groupFriend = await GroupFriend.find();
    return groupFriend;
  }
  async addGroupFriends(groupName, friendsGroup) {
    let groupFriend = new GroupFriend({
      groupName: groupName,
      friendsGroup: friendsGroup,
    });
    await groupFriend.save();
    return groupFriend;
  }

  async byIdGroupFriends(id) {
    let groupFriend = await GroupFriend.findById(id);
    return groupFriend;
  }

  async deleteByIdGroupFriends(id) {
    let groupFriend = await GroupFriend.findByIdAndDelete(id);
    return groupFriend;
  }
  async UpdateByIdGroupFriends(id, groupName, friendsGroup) {
      console.log(id);
    let groupFriend = await GroupFriend.updateOne(
      { _id: id },
      {
        groupName: groupName,
        friendsGroup: friendsGroup,
      }
    );

    return groupFriend;
  }
};
