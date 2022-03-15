const User = require('../models/user')
const container = require('../configContainer');
mongoose = container.resolve('mongoose');


module.exports = class UserRep {

    async addUserRep(body){

        console.log(body);
        let user =   await this.addUser(body.userName, body.userPassword,
              body.emailAdress, 
              body.profileIMG
             );
          return user;
             
      }
      
    async addUser(userName,userPassword,emailAdress,profileIMG
        ) {
           
            let user = new User({
                userName : userName,
                userPassword : userPassword,
                emailAdress : emailAdress,
                profileIMG : profileIMG,
               
            });
            await user.save();
            return user;
        }

}