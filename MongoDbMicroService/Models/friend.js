const container = require('../configContainer');
const mongoose = container.resolve('mongoose');
const Scheme  = mongoose.Schema;



const FriendScheme = new Scheme({
    friendsCollection: [
        {
            type : mongoose.Schema.Types.ObjectID,
            ref : 'User'
        }
    ],
   

});



const friendScheme = mongoose.model('FriendScheme',FriendScheme);
module.exports = friendScheme;