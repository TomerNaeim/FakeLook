const container = require('../configContainer');
const mongoose = container.resolve('mongoose');
const Scheme  = mongoose.Schema;



const UserScheme = new Scheme({
    userName: {
        type: String,
        required: [true, 'Username is required']
    },
    userPassword : {
        type: String,
        required: [true, 'Password is required']
    },
    emailAdress :{
        type: String,
        required: [true, 'Email adress is required']
    },
    
    profileIMG:{
        type: String,
        required: [true, 'Img adress is required'],
        default: ''
    },
    friendsCollectionFK : {
        type : mongoose.Schema.Types.ObjectID,
        ref : 'FriendScheme'
    }

});



const user = mongoose.model('User',UserScheme);
module.exports = user;