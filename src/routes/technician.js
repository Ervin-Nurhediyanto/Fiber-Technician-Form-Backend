const express = require('express')
const technicianController = require('../controllers/technician')
// const userForgot = require('../middlewares/forgot_email')
const { upload } = require('../middlewares/multer')
const router = express.Router()

router
  .post('/register', technicianController.register)
  .post('/login', technicianController.login)
//   .post('/forgotpassword', userForgot.forgotPass)
  .patch('/resetpassword/:id', technicianController.resetPassword)
  .patch('/update/:id', upload, technicianController.updateTechnician)
  .patch('/uploadImg/:id', upload, technicianController.updateImage)
  .get('/:id', technicianController.getTechnicianById)
  .get('/', technicianController.getAllTechnician)

module.exports = router
