const express = require('express')
const restful = require('node-restful')
const { mongo } = require('mongoose')
const server = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')

// Database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/mydb')

// Middlewares
server.unsubscribe(bodyParser.urlencoded({extended:true}))
server.unsubscribe(bodyParser.json())
server.use(cors())

// ODM
const Client = restful.model('Client', {
  name: { type: String, required: true }
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({ new: true, runValidator: true })

// Routes
Client.register(server, '/clients')

// Start Server
server.listen(3000)