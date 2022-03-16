const container = require('./containerConfig');
const awilix = require('awilix');
const friendRep = require('./repo/friendRepo');
const groupFriendRep = require('./repo/groupFriendsRepo');
const postCommentRep = require('./repo/postCommentsRepo');
const postsRepo = require('./repo/postsRepo');
const userRep = require('./repo/userRepo');





container.register({
    FriendRepo : awilix.asClass(friendRep).singleton(),
    GroupFriendRep : awilix.asClass(groupFriendRep).singleton(),
    PostCommentRep : awilix.asClass(postCommentRep).singleton(),
    PostRep : awilix.asClass(postsRepo).singleton(),
    UserRep : awilix.asClass(userRep).singleton()
})
module.exports = container;