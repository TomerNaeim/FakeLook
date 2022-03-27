const container = require('../configContainer');
const mongoose = container.resolve('mongoose');
const Scheme  = mongoose.Schema;



const PostsScheme = new Scheme({
    tags: [
        {  
          type :String
        }

    ],
    userUploaded : {
        type : mongoose.Schema.Types.ObjectID,
        ref : 'User'
    },
    uploadedLocation :[{
        type: Number,
        required: [true, 'location numbers  is required']}
    ],
    
    dateUploaded:{
        type: Date,
        required: [true, 'date  is required'],
     },
    userRefrenses : [
        {
            type : mongoose.Schema.Types.ObjectID,
            ref : 'User' 
        }
    ],
    picture : {
        type :String,
        required : [true,'picture is requierd']
    },
    postLikes : {
        type: Number,
        default : 0
    },
    postComments : [
        
        {
            type : mongoose.Schema.Types.ObjectID,
            ref : 'postCommentsScheme' 
            
        }
    ]


});



const postsScheme = mongoose.model('PostsScheme',PostsScheme);
module.exports = postsScheme;