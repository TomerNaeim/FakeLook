const express = require('express');
const cors = require('cors');
const container = require('./configContainer');
const userRep  = require('./repo/userRepo')
const config = container.resolve('config');

const PORT = config.get('serverPort.port');
const origin  = config.get('serverPort.originAllowed');
const app = express();



app.use(express.json());
app.use(cors ({
    origin: origin
}));

app.listen(PORT, ()=>{
    console.log(`server is running on PORT : 3000`);
});

app.post('/add',async (req,res)=>{
    let userrep = new userRep();
    console.log(req.body);
    let result = await userrep.addUserRep(req.body);
    console.log(result);
    res.send(result)

})
