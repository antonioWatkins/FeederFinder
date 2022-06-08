const expressAsyncHandler = require("express-async-handler")

const asyncHandler = require(expressAsyncHandler)
//@desc get feeder
//@route get /api/feeder
// @access Private
const getfeeder = asyncHandler(async (req, res) => {
    res.status(200).json({message: "getfeeder"})
})

//@desc post feeder
//@route post /api/feeder
// @access Private
 const postFeeder = asyncHandler(async (req,res) => {
     if(!req.body.text)
     res.status(400)
     throw new Error('the feeder didnt go into the correct bin')
 })

 //@desc put/update feeder
//@route put /api/feeder/:id
// @access Private
 const putFeeder = asyncHandler(async (req,res) => {
    res.status(200).json({message: `Feeder Finder has found new ways to feed ${req.params.id}`})
})

//@desc delete feeder
//@route delete /api/feeder/:id
// @access Private
const forgiveFeeder = asyncHandler(async  (req,res) => {
    res.status(200).json({message: `Feeder has redeemed themselves ${req.params.id}`})
})



module.exports = {
    getfeeder, postFeeder, putFeeder,forgiveFeeder,
}