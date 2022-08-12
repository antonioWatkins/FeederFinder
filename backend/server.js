const express = require('express')
const dotenv = require('dotenv').config()
require('colors')

const {errorHandler} = require('./middleware/errorMiddleware')



const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/feeder', require('./routes/feederRoutes'))
app.use('/api/report', require('./routes/reportRoutes'))
app.use('/api/user', require('./routes/userRoutes'))


app.use(errorHandler)


module.exports = app