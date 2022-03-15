const express = require('express');
const cors = require('cors');
const container = require('./configContainer');
const userRep  = require('./repo/userRepo')
//const config = container.resolve('config');

//const PORT = config.get('serverPort.port');
//const origin  = config.get('DevServer.originAllowed');
const app = express();



app.use(express.json());
app.use(cors ({
    origin: "*"
}));

app.listen(3000, ()=>{
    console.log(`server is running on PORT : 3000`);
});

app.post('/add',async (res,req)=>{
    let userrep = new userRep();
    
    let result = await userrep.addUserRep(req.body);
    console.log(result);
    res.send(result)

})
