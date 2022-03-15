const container = require('../configContainer');
const mongoose = container.resolve('mongoose');
const Scheme  = mongoose.Schema;



const PostCommentsScheme = new Scheme({
    userId : {
        type : mongoose.Schema.Types.ObjectID,
        ref : 'User'
    },
    comment:{
        type :String,
        require : [true,'missing descption']
    },
   

});



const postCommentsScheme = mongoose.model('PostCommentsScheme',PostCommentsScheme);
module.exports = postCommentsScheme;