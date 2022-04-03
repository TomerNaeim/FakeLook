 const axios = require('axios');
// const PORT = "http://localhost:5000/postComment/add"
 const PORT2= "http://localhost:5000/user/findone"
 module.exports = class SearchClass{
    async searchSer(dateFrom,dateTo,tags,publisher,tagsUsers,allPost)
    {
        let body = {"name": publisher}
         let user = await axios.post(PORT2,body)
         console.log(user);
     //     if(publisher !== "")
     //    {
     //     let newArr = allPost.map(user=>{
     //         if(user.userUploaded)
     //     })
     //    }
     }
 }

