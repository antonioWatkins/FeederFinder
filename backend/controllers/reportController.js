const axios = require('axios').default

const asyncHandler = require('express-async-handler')
const Report = require('../models/reportModel')
const User = require('../models/userModel')

//@desc get report
//@route get /api/report
// @access Private
const getReport = asyncHandler(async (req, res) => {
    const report = await Report.find({user: req.user.id})
    res.status(200).json(report)
})

//@desc post report
//@route post /api/report
// @access Private

//stuck on
const postReport = asyncHandler(async (req, res) => {
    if (!req.body.summoner) {
            console.log(req.body)
        res.status(400)
        throw new Error('the report didnt go into the correct bin')
    }
    try{
    const report = await Report.create({
        user: req.user.id,
        player: req.user.name,
        summoner: req.body.summoner,
        playerGrade: req.body.playerGrade,
        gameOverview: req.body.gameOverview,
        laning: req.body.laning,
        teamFighting: req.body.teamFighting
    })
    res.status(200).json(report)
}catch(e){
    console.log(e)
}

})


//@desc put/update report
//@route put /api/report/:id
// @access Private
const putReport = asyncHandler(async (req, res) => {
    const report = await Report.findById(req.params.id)
    
    if (!report) {
        res.status(400)
        throw new Error("report not found ");
    }

   

    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
        //make sure the logged in user matches the report user
    if (report.user.toString()!== req.user.id){
            res.status(401)
            throw new Error('user not authroized')
    }
    const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true })
        
        res.status(200).json(updatedReport)
    })
    
    
    
    
    
    //@desc delete report
    //@route delete /api/report/:id
    // @access Private
    const forgiveReport = asyncHandler(async (req, res) => {
    const report = await Report.findById(req.params.id)
    if(!report) {
        res.status(400)
        throw new Error ('report not found')
    }


    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
        //make sure the logged in user matches the report user
    if (report.user.toString()!== req.user.id){
            res.status(401)
            throw new Error('user not authroized')
    }
    await report.remove()
    res.status(200).json({id: req.params.id})
    })

    const getReportId = asyncHandler(async (req, res) => {
        const report = await Report.findById(req.params.id)
        
        if (!report) {
            res.status(400)
            throw new Error("report not found ");
        }
    
       
    
        if(!req.user){
            res.status(401)
            throw new Error('User not found')
        }
            //make sure the logged in user matches the report user
        if (report.user.toString()!== req.user.id){
                res.status(401)
                throw new Error('user not authroized')
        }
        const reportId = await Report.findById(req.params.id, req.body)
            res.status(200).json(reportId)
        })






module.exports = {
    getReport, getReportId, postReport, putReport, forgiveReport,
}