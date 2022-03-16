const Posts = require('../models/posts')
const container = require('../configContainer');
//const { post } = require('../Routes/userRouter');
mongoose = container.resolve('mongoose');


module.exports = class PostsRepo {
//OutSide Function to export Outside
    async addPostRep(body){

        console.log(body);
        let post =   await this.addPost(body.tags, body.userUploaded,
              body.uploadedLocation, body.dateUploaded,body.userRefrenses, 
              body.picture,body.postLikes,body.postComments
             );
          return post;
             
      }
      
      async getPostByIdRep(body)
      {
          let post = await this.getPostByID(body.id)
          return post;
      }
      async getAllPostRep() {
        let posts = await this.allPosts();
        return posts;
      }
      async addLikeByIdRep(body)
      {
          let post = await this.addLikeToPost(body.id)
          return post;
      }
    
      async deletePostByIdRep(body) {
        let post = await this.deletePostById(body.id);
        return post;
      }
      async addCommentToPostWithIdsRep(body) {
        let post = await this.addCommentPost(body.PostId,body.commentId);
        return post;
      }

      async updatePostWithIdRep(body) {
        let post = await this.updateOnePost(body.id,body.tags, body.userUploaded,
            body.uploadedLocation, body.dateUploaded,body.userRefrenses, 
            body.picture,body.postLikes,body.postComments);
        return post;
      }
    




// Inside Functions 
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
    
    async addPost(tags,userUploaded,
        uploadedLocation, dateUploaded,userRefrenses, 
        picture,picturepostLikes,postComments
       
        ) {
           
            let post = new Posts({
                tags : tags,
                userUploaded : userUploaded,
                uploadedLocation : uploadedLocation,
                dateUploaded : dateUploaded,
                userRefrenses : userRefrenses ,
                picture : picture,
                postLikes : picturepostLikes,
                postComments : postComments


               
            });
            await post.save();
            return post;
        }
        async addLikeToPost(id){
           try{
            let post = await Posts.findById(id)
            console.log(post.postLikes);
            let number = post.postLikes + 1
            await Posts.updateOne({_id:id},{
                tags : post.tags,
                userUploaded : post.userUploaded,
                uploadedLocation : post.uploadedLocation,
                dateUploaded : post.dateUploaded,
                userRefrenses : post.userRefrenses ,
                picture : post.picture,
                postLikes : number,
                postComments : post.postComments
                });
                return `made update on postId : ${id}`
           }
           catch(error)
           {
               return error
           }
            
                

        }
        async addCommentPost(postId,commentId){
            try{
             let post = await Posts.findById(postId)
             console.log(commentId);
             let newCommentArray = post.postComments;
             newCommentArray.push(`${commentId}`)
             console.log(newCommentArray);
             await Posts.updateOne({_id:postId},{
                 tags : post.tags,
                 userUploaded : post.userUploaded,
                 uploadedLocation : post.uploadedLocation,
                 dateUploaded : post.dateUploaded,
                 userRefrenses : post.userRefrenses ,
                 picture : post.picture,
                 postLikes : post.postLikes,
                 postComments : newCommentArray
                 });
                 return `made update on postId : ${postId}`
            }
            catch(error)
            {
                return error
            }
             
                 
 
         }
 

        async updateOnePost(id,tags,userUploaded,
            uploadedLocation, dateUploaded,userRefrenses, 
            picture,picturepostLikes,postComments)
            {
                try{
                    
                    await Posts.updateOne({_id:id},{
                        tags : tags,
                        userUploaded : userUploaded,
                        uploadedLocation : uploadedLocation,
                        dateUploaded : dateUploaded,
                        userRefrenses : userRefrenses ,
                        picture : picture,
                        postLikes : picturepostLikes,
                        postComments : postComments
                        });
                        return `made Update to ${id}`
                }
                catch(error)
                {
                    return error;
                }
                
                
            }

}