const PostComment = require("../models/postComments");
const container = require("../configContainer");
mongoose = container.resolve("mongoose");

module.exports = class PostComments {
  //OutSide Function to export Outside
  async addPostCommentRep(body) {
    console.log(body);
    let postComments = await this.addPostComments(body.comment, body.userId);
    return postComments;
  }

  // Inside Functions

  async addPostComments(comment, usrId) {
    let postComment = new PostComment({
      comment: comment,
      userId: userId[""],
    });
    await postComment.save();
    return postComment;
  }
};
