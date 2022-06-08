const express = require('express')
const router = express.Router()
const {getfeeder, postFeeder, putFeeder, forgiveFeeder} = require('../controllers/feederController')


router.get('/', getfeeder)

router.post('/', postFeeder)

router.put('/:id', putFeeder) 

router.delete('/:id', forgiveFeeder )


// alternitivly  below is the short hand of the same thing above but i kept the above version because 
//it is easier to read

// router.route('/').get(getfeeder).post(postFeeder)
// router.route('/').delete(forgiveFeeder).put(putFeeder)

module.exports = router