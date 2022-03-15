const GroupFriend = require("../models/friendGroups");
const container = require("../configContainer");
mongoose = container.resolve("mongoose");

module.exports = class GroupFriends {
  //OutSide Function to export Outside
  async addGroupFriendsRep(body) {
    console.log(body);
    let groupFriend = await this.addGroupFriends(body.groupName, body.userId);
    return groupFriend;
  }

  // Inside Function

  async addGroupFriends(groupName, userId) {
    let groupFriend = new GroupFriend({
      groupName: groupName,
      userId: userId,
    });
    await groupFriend.save();
    return groupFriend;
  }
};
