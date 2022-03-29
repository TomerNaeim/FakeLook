const axios = require('axios');
const PORT = "http://localhost:5000/postComment/getById"

const getCommentModelService = async (id)=>{
    console.log('in service')
    let result = await axios.post(PORT,{"id":id});
    if(result)
    {
        let comment = result.data;
        
        return comment;
    }
    else {
        return "Nothing Found"
    }
}
export default getCommentModelService;