const container = require('../configContainer');
const mongoose = container.resolve('mongoose');
const Scheme  = mongoose.Schema;



const FriendGroupScheme = new Scheme({
    groupName : {
        type : String,
        require : [true, 'group name is required']
    },
    friendsGroup: [
        {
            type : mongoose.Schema.Types.ObjectID,
            ref : 'User'
        }
    ],
   

});



const friendGroupScheme = mongoose.model('FriendGroupScheme',FriendGroupScheme);
module.exports = friendGroupScheme;