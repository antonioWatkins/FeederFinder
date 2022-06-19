const express = require('express')
const router = express.Router()
const {registerUser, getUser, loginUser} = require('../controllers/userController')

const {protect} = require('../middleware/authmiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/getUser', protect, getUser)




module.exports = router