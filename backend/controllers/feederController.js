

const asyncHandler = require('express-async-handler')
const Feeder = require('../models/feederModel')

//@desc get feeder
//@route get /api/feeder
// @access Private
const getfeeder = asyncHandler(async (req, res) => {
    const feeder = await Feeder.find()
    res.status(200).json(feeder)
})

//@desc post feeder
//@route post /api/feeder
// @access Private
const postFeeder = asyncHandler(async (req, res) => {
    if (!req.body.player) {

        res.status(400)
        throw new Error('the feeder didnt go into the correct bin')
    }
    const feeder = await Feeder.create({
        player: req.body.player
    })
    res.status(200).json(feeder)
})


//@desc put/update feeder
//@route put /api/feeder/:id
// @access Private
const putFeeder = asyncHandler(async (req, res) => {
    const feeder = await Feeder.findById(req.params.id)
    
    if (!feeder) {
        res.status(400)
        throw new Error("feeder not found ");
    }
    const updatedFeeder = await Feeder.findByIdAndUpdate(req.params.id, req.
        body, {
            new: true,
        })
        
        res.status(200).json(updatedFeeder)
    })
    
    
    
    
    
    //@desc delete feeder
    //@route delete /api/feeder/:id
    // @access Private
    const forgiveFeeder = asyncHandler(async (req, res) => {
    const feeder = await Feeder.findById(req.params.id)
    if(!feeder) {
        res.status(400)
        throw new Error ('feeder not found')
    }
    await feeder.remove()
    res.status(200).json({id: req.params.id})
    })




module.exports = {
    getfeeder, postFeeder, putFeeder, forgiveFeeder,
}