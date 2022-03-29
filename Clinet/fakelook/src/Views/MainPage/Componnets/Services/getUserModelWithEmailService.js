const axios = require('axios');
const PORT = "http://localhost:5000/user/getUserByEmail"

const getUserModelWithEmailService = async (email)=>{
    console.log('in service')
    let result = await axios.post(PORT,{"email":`${email}`});
    if(result)
    {
        let user = result.data;
        console.log(user);
        if(user !=null)
        return user;
    }
    else {
        return "Nothing Found"
    }
}
export default getUserModelWithEmailService;