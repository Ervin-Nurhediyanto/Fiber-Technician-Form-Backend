const express = require('express')
const technicianRouters = require('./technician')
// const usersRouters = require('./users')
// const contactRouters = require('./contact')
// const chatsRouters = require('./chats')
const router = express.Router()

router
  .use('/technician', technicianRouters)
  // .use('/users', usersRouters)
  // .use('/contacts', contactRouters)
  // .use('/chats', chatsRouters)

module.exports = router
