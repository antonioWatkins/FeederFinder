const mongoose = require('mongoose')


const reportSchema = mongoose.Schema({

  user:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
},
player: {
    type:String,
    required: [true, 'please add a player value']
},
summoner: {
    type: String,
    required: true,
},
gameOverview: {
   type: String,
   required: false,
},
laning: {
    type: String,
    required: false,
},
teamfighting:{
    type: String,
    required: false,
},
playerGrade:{
    type: String,
    required: true
},

 


    
},

{timestamps: true})
module.exports = mongoose.model('Report', reportSchema)