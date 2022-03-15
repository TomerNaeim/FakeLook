const Posts = require('../models/posts')
const container = require('../configContainer');
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
      




// Inside Functions 

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

}