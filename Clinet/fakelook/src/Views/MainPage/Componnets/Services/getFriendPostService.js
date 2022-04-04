const axios = require('axios');
const PORT = "http://localhost:5000/post/getFriendPosts"

const getFriendPostService = async (id)=>{
    console.log('in service')
    let result = await axios.post(PORT,{"id":id});
    if(result)
    {
        let posts = result.data;
        
        return posts;
    }
    else {
        return "Nothing Found"
    }
}
export default getFriendPostService;