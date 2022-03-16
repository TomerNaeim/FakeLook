const User = require('../models/user')
const container = require('../configContainer');
mongoose = container.resolve('mongoose');


module.exports = class UserRep {
//OutSide Function to export Outside
    async addUserRep(body,newFriendID){

        console.log(newFriendID);
        let user =   await this.addUser(body.userName, body.userPassword,
              body.emailAdress, 
              body.profileIMG,newFriendID
             );
          return user;
             
      }
      async getUserByIdRep(body)
      {
          let user = await this.getUserByID(body.id)
          return user;
      }
      async getallUserRep() {
        let users = await this.allUser();
        return users;
      }
    
    
      async deleteByIdFriendsRep(id) {
        let user = await this.deleteUserById(id);
        return user;
      }
    
      




// Inside Functions 

    async allUser() {
    let user = await user.find();
    return user;
  }

    async deleteUserById(id) {
    let user = await user.findByIdAndDelete(id);
    return user;
    }

    async addUser(userName,userPassword,emailAdress,profileIMG,newFriendID
        ) 
        {
           
            let user = new User({
                userName : userName,
                userPassword : userPassword,
                emailAdress : emailAdress,
                profileIMG : profileIMG,
                friendsCollectionFK : newFriendID
               
            });
            await user.save();
            return user;
        }
        async getUserByID (id)
        {
            let result  = await User.findById(id)
            return result;
        }

}