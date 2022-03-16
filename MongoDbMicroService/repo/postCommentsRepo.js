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

  async addPostComments(comment, userId) {
    let postComment = new PostComment({
      comment: comment,
      userId: userId,
    });
    await postComment.save();
    return postComment;
  }

  async allPostCommentRep() {
    let postComments = await this.allPostComments();
    return postComments;
  }

  async allPostComments() {
    let postComments = await PostComment.find();
    return postComments;
  }
  async byIdPostCommentRep(id) {
    console.log(id);
    let postComments = await this.byIdPostComments(id);
    return postComments;
  }

  async byIdPostComments(id) {
    let postComments = await PostComment.findById(id);
    return postComments;
  }

  async deleteByIdPostCommentRep(id) {
    console.log(id);
    let postComments = await this.deleteByIdPostComments(id);
    return postComments;
  }

  async deleteByIdPostComments(id) {
    let postComments = await PostComment.findByIdAndDelete(id);
    return postComments;
  }
};
