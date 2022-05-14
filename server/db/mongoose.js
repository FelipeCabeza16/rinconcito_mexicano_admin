const mongoose = require('mongoose')
const config = require('../config');

mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async() => {
    console.log('Connection to MongoDB successful')  
})
.catch(error => console.log(error));