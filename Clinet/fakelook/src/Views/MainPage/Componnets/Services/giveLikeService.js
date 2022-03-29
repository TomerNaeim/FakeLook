const axios = require('axios');
const PORT = "http://localhost:5000/post/addLikeById"

const giveLikeService = async (id)=>{
    console.log('in service')
    let result = await axios.post(PORT,{"id":id});
    if(result)
    {
        let post = result.data;
        return post;
    }
    else {
        return "Nothing Found"
    }
}
export default giveLikeService;