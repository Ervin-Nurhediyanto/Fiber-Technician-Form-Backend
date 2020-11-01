const express = require('express')
const technicianController = require('../controllers/technician')
const { verifyAccess } = require('../middlewares/auth')
const { upload } = require('../middlewares/multer')
// const userForgot = require('../middlewares/forgot_email')

const router = express.Router()

router
  .get('/', technicianController.getAllTechnician)
  .post('/register', technicianController.register)
  .post('/login', technicianController.login)
  .patch('/update/:id', verifyAccess, technicianController.updateTechnician)
  .patch('/uploadImg/:id', verifyAccess, upload, technicianController.updateImage)

  .patch('/resetpassword/:id', technicianController.resetPassword)

  .patch('/uploadImg/:id', upload, technicianController.updateImage)
  .get('/:id', technicianController.getTechnicianById)

//   .post('/forgotpassword', userForgot.forgotPass)

module.exports = router
