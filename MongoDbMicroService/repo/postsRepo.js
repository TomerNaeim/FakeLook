const Posts = require('../models/posts')
const container = require('../configContainer');
const { post } = require('../Routes/userRouter');
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
    
    
      async deletePostByIdRep(body) {
        let post = await this.deletePostById(body.id);
        return post;
      }

      async updatePostWithId(body) {
        let post = await this.updateOnePost(body.id,body.tags, body.userUploaded,
            body.uploadedLocation, body.dateUploaded,body.userRefrenses, 
            body.picture,body.postLikes,body.postComments);
        return post;
      }
    




// Inside Functions 
    async allPost() {
    let post = await post.find();
    return post;
  }

    async deletePostById(id) {
    let post = await post.findByIdAndDelete(id);
    return post;
    }

    async getPostByID(id) {
        let post = await post.findById(id);
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

        async updateOnePost(id,tags,userUploaded,
            uploadedLocation, dateUploaded,userRefrenses, 
            picture,picturepostLikes,postComments)
            {
                let post = await post.findById(id);
                
            }

}