'use strict'

const express = require('express')

const server = express()

server.use(express.static(__dirname + '/app'))

const REST_PORT = (process.env.PORT || 4000)

server.listen(REST_PORT, () => {
  console.log('Server ready on port ' + REST_PORT)
})
