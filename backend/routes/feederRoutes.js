const express = require('express')
const router = express.Router()
const {getFeeder, getFeederId, postFeeder, putFeeder, forgiveFeeder, toFront} = require('../controllers/feederController')

const {protect} = require('../middleware/authmiddleware')


router.get('/', protect, getFeeder)

router.get('/:id', protect, getFeederId)

router.post('/', protect, postFeeder)

router.put('/:id', protect, putFeeder) 
router.put('/update/:name', protect, putFeeder)

router.delete('/:id', protect, forgiveFeeder )

router.get('/searchpage/:player', toFront )


// alternitivly  below is the short hand of the same thing above but i kept the above version because 
//it is easier to read

// router.route('/').get(getfeeder).post(postFeeder)
// router.route('/').delete(forgiveFeeder).put(putFeeder)

module.exports = router