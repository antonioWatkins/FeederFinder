const express = require('express')
const router = express.Router()
const {getfeeder, postFeeder, putFeeder, forgiveFeeder, toFront} = require('../controllers/feederController')

const {protect} = require('../middleware/authmiddleware')


router.get('/', protect, getfeeder)

router.post('/', protect, postFeeder)

router.put('/:id', protect, putFeeder) 

router.delete('/:id', protect, forgiveFeeder )

router.get('/searchpage/:player', toFront )


// alternitivly  below is the short hand of the same thing above but i kept the above version because 
//it is easier to read

// router.route('/').get(getfeeder).post(postFeeder)
// router.route('/').delete(forgiveFeeder).put(putFeeder)

module.exports = router