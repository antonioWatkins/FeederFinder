

const asyncHandler = require('express-async-handler')
const Feeder = require('../models/feederModel')
const User = require('../models/userModel')

//@desc get feeder
//@route get /api/feeder
// @access Private
const getfeeder = asyncHandler(async (req, res) => {
    const feeder = await Feeder.find({user: req.user.id})
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
        player: req.body.player,
        user: req.user.id,
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

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
        //make sure the logged in user matches the feeder user
    if (feeder.user.toString()!== user.id){
            res.status(401)
            throw new Error('user not authroized')
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

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
        //make sure the logged in user matches the feeder user
    if (feeder.user.toString()!== user.id){
            res.status(401)
            throw new Error('user not authroized')
    }
    await feeder.remove()
    res.status(200).json({id: req.params.id})
    })




module.exports = {
    getfeeder, postFeeder, putFeeder, forgiveFeeder,
}