const express = require('express')
const technicianController = require('../controllers/technician')
const { verifyAccess } = require('../middlewares/auth')

// const userForgot = require('../middlewares/forgot_email')
const { upload } = require('../middlewares/multer')
const router = express.Router()

router
  .get('/', technicianController.getAllTechnician)
  .post('/register', technicianController.register)
  .post('/login', technicianController.login)

  .patch('/resetpassword/:id', technicianController.resetPassword)
  .patch('/update/:id', upload, technicianController.updateTechnician)
  .patch('/uploadImg/:id', upload, technicianController.updateImage)
  .get('/:id', technicianController.getTechnicianById)

//   .post('/forgotpassword', userForgot.forgotPass)

module.exports = router
