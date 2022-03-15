const awilix = require('awilix');

const config = require('config');
const dbURl = config.get('db.url');
console.log('inside'+config);
const mongoose = require('mongoose');


const container = awilix.createContainer({injectionMode: awilix.InjectionMode.CLASSIC});

mongoose.connect(dbURl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log(`conected to mongoDB ${result}`))
    .catch((error) => console.log(error));

    container.register({
        config : awilix.asValue(config),
        mongoose: awilix.asValue(mongoose)
    });
    
module.exports = container;