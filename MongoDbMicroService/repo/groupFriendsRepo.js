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

  // Inside Function

  async addGroupFriends(groupName, friendsGroup) {
    let groupFriend = new GroupFriend({
      groupName: groupName,
      friendsGroup: friendsGroup,
    });
    await groupFriend.save();
    return groupFriend;
  }
  async allGroupFriendsRep() {
    let groupFriend = await this.allGroupFriends();
    return groupFriend;
  }

  async allGroupFriends() {
    let groupFriend = await GroupFriend.find();
    return groupFriend;
  }

  async byIdGroupFriendsRep(id) {
    let groupFriend = await this.byIdGroupFriends(id);
    return groupFriend;
  }

  async byIdGroupFriends(id) {
    let groupFriend = await GroupFriend.findById(id);
    return groupFriend;
  }

  async deleteByIdGroupFriendsRep(id) {
    let groupFriend = await this.deleteByIdGroupFriends(id);
    return groupFriend;
  }

  async deleteByIdGroupFriends(id) {
    let groupFriend = await GroupFriend.findByIdAndDelete(id);
    return groupFriend;
  }
};
