
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//register new user
// post /api/user/id
//@access public
const registerUser = asyncHandler(async(req,res) => {
    const{name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('please add all fields')
    }
    const userExist = await User.findOne({email})

    if (userExist){
        res.status(400)
        throw new Error('User already exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name, email, password: hashedPassword
    })
  if(user){
    res.status(201).json({
        success: true,
        _id: user.id,
        name: user.name,
        email: user.email,
        token: gernerateToken(user._id)
    })
  }else{
    res.status(400) 
    throw new Error('invalid user data')
  }

})





//register  authenticate
// post /api/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: gernerateToken(user._id),
        })
    } else{
        res.status(400) 
    throw new Error('invalid credentials')
    }
})

//register get user data
// get /api/user/id
//@access private
const getUser = asyncHandler(async (req,res) => {

    res.status(200).json(req.user)
})

const gernerateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "14d",
    })
}

module.exports= {registerUser, loginUser, getUser}
   



