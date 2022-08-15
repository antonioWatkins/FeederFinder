const mongoose = require('mongoose')


const reportSchema = mongoose.Schema({

  
userid:{
    type:String,
    required: true,
},
player:{
    type: String,
    required: true,
},
summoner: {
    type: String,
    required: true,
},
post: {
   type: String,
   required: false,
},

},
{timestamps: true})
module.exports = mongoose.model('Report', reportSchema)