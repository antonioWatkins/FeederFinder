const mongoose = require('mongoose')


const feederSchema = mongoose.Schema({
    player: {
        type: String,
        required: [true, 'Please add name d value']
    }
    
})

module.exports = mongoose.model('Feeder', feederSchema)