const axios = require('axios');
const PORT = "http://localhost:5000/user/getUserById"

const getNameForUserService = async (id)=>{
    console.log('in service')
    let result = await axios.post(PORT,{"id":id});
    if(result)
    {
        let user = result.data;
        return user;
    }
    else {
        return "Nothing Found"
    }
}
export default getNameForUserService;