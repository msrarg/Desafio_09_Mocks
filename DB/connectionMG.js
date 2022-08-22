const mongoose = require('mongoose');
require('dotenv').config();

const connetionMG = (async () => {
    try{
         mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
    } catch(e) {
        console.log(e);
    }
})();

module.exports = connetionMG;