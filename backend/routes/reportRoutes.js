const express = require('express')
const router = express.Router()
const {getReport, postReport, likeReport, putReport} = require('../controllers/reportController')

const {protect} = require('../middleware/authmiddleware')


router.get('/', getReport)
router.post('/:id', protect, postReport)
router.put('/:id', protect, putReport)

router.put('/:id/like', likeReport)


module.exports = router