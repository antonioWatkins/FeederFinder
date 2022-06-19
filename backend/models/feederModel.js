const mongoose = require('mongoose')


const feederSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    player: {
        type: String,
        required: [true, 'Please add name value']
    }
    
})

module.exports = mongoose.model('Feeder', feederSchema)