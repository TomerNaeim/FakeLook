const Posts = require("../models/posts");
const container = require("../configContainer");
const axios = require('axios');
const Search = require("./Services/SearchClass")
//const { post } = require('../Routes/userRouter');
mongoose = container.resolve("mongoose");

module.exports = class PostsRepo {
  //OutSide Function to export Outside
  async addPostRep(body) {
    console.log(body);
    let post = await this.addPost(
      body.tags,
      body.userUploaded,
      body.uploadedLocation,
      body.dateUploaded,
      body.userRefrenses,
      body.picture,
      body.postLikes,
      body.postComments
    );
    return post;
  }
  async getPostsOnlyFriends(body)
  {
    let posts = await this.allPostsOnlyFriends(body.id);
    console.log("allPosts",posts);
    return posts;
  }
  async filterRepo(body)
  {
    console.log("---------",body);
    let arr = await this.filter(
      body.dateFrom,
      body.dateTo,
      body.tags,
      body.publisher,
      body.tagsUsers,
      body.allPost
    )
    return arr;
  }

  async getPostByIdRep(body) {
    let post = await this.getPostByID(body.id);
    return post;
  }
  async getAllPostRep() {
    let posts = await this.allPosts();
    return posts;
  }
  async addLikeByIdRep(body) {
    let post = await this.addLikeToPost(body.id);
    return post;
  }

  async deletePostByIdRep(body) {
    let post = await this.deletePostById(body.id);
    return post;
  }
  async addCommentToPostWithIdsRep(body) {
    let post = await this.addCommentPost(body.PostId, body.commentId);
    return post;
  }

  async updatePostWithIdRep(body) {
    let post = await this.updateOnePost(
      body.id,
      body.tags,
      body.userUploaded,
      body.uploadedLocation,
      body.dateUploaded,
      body.userRefrenses,
      body.picture,
      body.postLikes,
      body.postComments
    );
    return post;
  }

  // Inside Functions


  async allPostsOnlyFriends(id)
  {
    let myUser = await axios.post("http://localhost:5000/user/getUserById",{"id":id})
    console.log(myUser);
    let friendList = await axios.post("http://localhost:5000/friend/getById",{"id":myUser.data.friendsCollectionFK})
    console.log(friendList.data.friendsCollection);
    let post = await Posts.find();
   return post.map(p=>{
      for (let index = 0; index < friendList.data.friendsCollection.length; index++) {
        console.log("inside",p);
        let element = friendList.data.friendsCollection[index];
        console.log(p.userUploaded.toString());
        if(element===p.userUploaded.toString())
      {
        console.log("found");
        return p;
      }
      
      }
    })
  }

  async filter(dateFrom,dateTo,tags,publisher,tagsUsers,allPost)
  {
    let tagedFlag = false;
    let flagDateFrom = false;
    let flagDateTo = false;
    let publisherFlag = false;

    if(publisher !="")
    {
      publisherFlag= true;
    }

    if(tags !="")
    {
       tagedFlag= true;
    }
    if(dateFrom != "")
    {
      console.log("Got Dated From");
       flagDateFrom = true;
    }
    if(dateTo != "")
    {
      console.log("Got Dated To");
       flagDateTo = true;
    }
    if(flagDateTo &&flagDateFrom)
    {
      allPost= this.dateFilter(allPost,dateTo,dateFrom)
      console.log(allPost);
    }
    console.log('before', allPost);
    if(publisherFlag)
    {
      allPost = this.userFilter(allPost,publisher);
    }
    if(tagedFlag)
    {
      allPost = this.tagsFilter(allPost,tags);
    }
    return allPost;

   
  }

  async userFilter(postList,tags)
  {
    return postList.map((p)=>{
      if(p.tags.length =!0)
      {
        
      }
    })
  }
 async userFilter(postList,publisher)
  {
    
    let PORT2= "http://localhost:5000/user/findone"
    let body = {"name": publisher}
   
    let user = await axios.post(PORT2,body)
    console.log("in serch",user.data);
    if(user.data.length != 0 )
    { 
      return postList.map(p=>{
      console.log("line 85",p);
      if(p != null)
      {
      if(p.userUploaded == null)
      {
        return null;
      }
      
      for (let index = 0; index < user.data.length; index++) {
        const element = user.data[index];
        
        if(element._id==p.userUploaded)
      {
        console.log("found");
        return p;
      }
      
      }}
    })}
    else
    {
       console.log("no name");
       return allPost;
    }
  }
  dateFilter(postList,dateTo,dateFrom)
  {
     var d1 = dateFrom.split("/");
    var d2 = dateTo.split("/");
    
    const date = new Date('2022-09-24');

    const start = dateFrom;
    const end = dateTo;
    
   
    

    var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
    var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
    console.log("from" ,dateTo.toString());
    console.log("to" ,dateFrom.toString());
    return postList.map((e)=>{
      if(e.dateUploaded){

       let currentDate = e.dateUploaded.slice(0,10); 
       if (currentDate > start && currentDate < end) {
        console.log('✅ date is between the 2 dates');
        return e;
      } else {
        
        console.log('⛔️ date is not in the range');
        return null;
      }}
    })

  }
  async allPosts() {
    let post = await Posts.find();
    return post;
  }

  async deletePostById(id) {
    let post = await Posts.findByIdAndDelete(id);
    return post;
  }

  async getPostByID(id) {
    let post = await Posts.findById(id);
    return post;
  }

  async addPost(
    tags,
    userUploaded,
    uploadedLocation,
    dateUploaded,
    userRefrenses,
    picture,
    picturepostLikes,
    postComments
  ) {
    let post = new Posts({
      tags: tags,
      userUploaded: userUploaded,
      uploadedLocation: uploadedLocation,
      dateUploaded: new Date(Date.now()).toLocaleDateString(),
      userRefrenses: userRefrenses,
      picture: picture,
      postLikes: picturepostLikes,
      postComments: postComments,
    });
    await post.save();
    return post;
  }
  async addLikeToPost(id) {
    try {
      let post = await Posts.findById(id);
      console.log(post.postLikes);
      let number = post.postLikes + 1;
      await Posts.updateOne(
        { _id: id },
        {
          tags: post.tags,
          userUploaded: post.userUploaded,
          uploadedLocation: post.uploadedLocation,
          dateUploaded: post.dateUploaded,
          userRefrenses: post.userRefrenses,
          picture: post.picture,
          postLikes: number,
          postComments: post.postComments,
        }
      );
      return `made update on postId : ${id}`;
    } catch (error) {
      return error;
    }
  }
  async addCommentPost(postId, commentId) {
    try {
      let post = await Posts.findById(postId);
      console.log(commentId);
      let newCommentArray = post.postComments;
      newCommentArray.push(`${commentId}`);
      console.log(newCommentArray);
      await Posts.updateOne(
        { _id: postId },
        {
          tags: post.tags,
          userUploaded: post.userUploaded,
          uploadedLocation: post.uploadedLocation,
          dateUploaded: post.dateUploaded,
          userRefrenses: post.userRefrenses,
          picture: post.picture,
          postLikes: post.postLikes,
          postComments: newCommentArray,
        }
      );
      return `made update on postId : ${postId}`;
    } catch (error) {
      return error;
    }
  }

  async updateOnePost(
    id,
    tags,
    userUploaded,
    uploadedLocation,
    dateUploaded,
    userRefrenses,
    picture,
    picturepostLikes,
    postComments
  ) {
    try {
      await Posts.updateOne(
        { _id: id },
        {
          tags: tags,
          userUploaded: userUploaded,
          uploadedLocation: uploadedLocation,
          dateUploaded: dateUploaded,
          userRefrenses: userRefrenses,
          picture: picture,
          postLikes: picturepostLikes,
          postComments: postComments,
        }
      );
      return `made Update to ${id}`;
    } catch (error) {
      return error;
    }
  }
};
