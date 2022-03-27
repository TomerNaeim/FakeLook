const axios = require('axios');
const PORT = "http://localhost:5000/post/getAll"

const importPostsServices = async ()=>{
    console.log('in service')
    let result = await axios.get(PORT);
    if(result)
    {
        let arrPost = result.data;
        return arrPost;
    }
    else {
        return "Nothing Found"
    }
}
export default importPostsServices;