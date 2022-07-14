const mongoose = require('mongoose')


const feederSchema = mongoose.Schema({
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
        required: false,
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
    playergrade:{
        type: String,
        required: true
    },


})

module.exports = mongoose.model('Feeder', feederSchema)