const express = require('express')
const router = express.Router()
const {getReport,  postReport, putReport,} = require('../controllers/reportController')

const {protect} = require('../middleware/authmiddleware')


router.get('/:id', protect, getReport)



router.post('/:id', protect, postReport)


router.put('/:id', protect, putReport)

module.exports = router