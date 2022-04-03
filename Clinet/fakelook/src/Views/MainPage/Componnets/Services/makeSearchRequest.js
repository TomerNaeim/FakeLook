const axios = require('axios');
const PORT = "http://localhost:5000/post/filter"

const makeSearchRequest = async (dateFrom,dateTo,tags,publisher,tagsUsers,allPost)=>{
    console.log('in service')
    console.log(publisher);
    let body = {
        "dateTo" : dateTo,
        "dateFrom" : dateFrom,
        "tags" : tags,
        "publisher" : publisher,
        "tagsUsers" :tagsUsers,
        "allPost" : allPost
    }
    console.log(body);
    let result = await axios.post(PORT,body);
    if(result)
    {
        let arrPost = result.data;
        return arrPost;
    }
    else {
        return "Nothing Found"
    }
}
export default makeSearchRequest;