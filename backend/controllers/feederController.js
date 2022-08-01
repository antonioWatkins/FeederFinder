const axios = require('axios').default

const asyncHandler = require('express-async-handler')
const Feeder = require('../models/feederModel')
const User = require('../models/userModel')

//@desc get feeder
//@route get /api/feeder
// @access Private
const getFeeder = asyncHandler(async (req, res) => {
    const feeder = await Feeder.find({user: req.user.id})
    res.status(200).json(feeder)
})

//@desc post feeder
//@route post /api/feeder
// @access Private

//stuck on
const postFeeder = asyncHandler(async (req, res) => {
    if (!req.body.summoner) {
            console.log(req.body)
        res.status(400)
        throw new Error('the feeder didnt go into the correct bin')
    }
    try{
    const feeder = await Feeder.create({
        user: req.user.id,
        player: req.user.name,
        summoner: req.body.summoner,
        playerGrade: req.body.playerGrade,
        gameOverview: req.body.gameOverview,
        laning: req.body.laning,
        teamFighting: req.body.teamFighting
    })
    res.status(200).json(feeder)
}catch(e){
    console.log(e)
}

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

   

    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
        //make sure the logged in user matches the feeder user
    if (feeder.user.toString()!== req.user.id){
            res.status(401)
            throw new Error('user not authroized')
    }
    const updatedFeeder = await Feeder.findByIdAndUpdate(req.params.id, req.body, { new: true })
        
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


    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
        //make sure the logged in user matches the feeder user
    if (feeder.user.toString()!== req.user.id){
            res.status(401)
            throw new Error('user not authroized')
    }
    await feeder.remove()
    res.status(200).json({id: req.params.id})
    })

    const getFeederId = asyncHandler(async (req, res) => {
        const feeder = await Feeder.findById(req.params.id)
        
        if (!feeder) {
            res.status(400)
            throw new Error("feeder not found ");
        }
    
       
    
        if(!req.user){
            res.status(401)
            throw new Error('User not found')
        }
            //make sure the logged in user matches the feeder user
        if (feeder.user.toString()!== req.user.id){
                res.status(401)
                throw new Error('user not authroized')
        }
        const feederId = await Feeder.findById(req.params.id, req.body)
            res.status(200).json(feederId)
        })


const  toFront = asyncHandler(async (req, res) => {
    const {player}= req.params;
console.log(player)
    const playerData = await SearchForPlayer(player)
    res.json(playerData)
    function SearchForPlayer(player) {
        
        
        const options = {
            method: 'GET',
            url: 'https://lol_stats.p.rapidapi.com/na1/' + player,
            headers: {
                'X-RapidAPI-Key': 'f5363a7e87mshaf27c657b83d227p126a5ajsnddbdde284f81',
                'X-RapidAPI-Host': 'lol_stats.p.rapidapi.com'
            }
        };
        // returns data from api. if data does not exist it will return null handing the error. if data is present data will show on front end.
        return axios.request(options).then(response => response.data=="Summoner doesn't exist"? null: response.data).catch(() => null);
    }
})



module.exports = {
    getFeeder, getFeederId, postFeeder, putFeeder, forgiveFeeder, toFront,
}