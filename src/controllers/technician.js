const modelTechnician = require('../models/technician')
const sendEmail = require('../middlewares/sendEmail')
const helpers = require('../helpers/helpers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  register: (req, res) => {
    const { name, email, password } = req.body
    const data = {
      name,
      email,
      password
    }
    bcrypt.genSalt(10, function (_err, salt) {
      bcrypt.hash(data.password, salt, function (_err, hash) {
        data.password = hash
        modelTechnician.register(data)
          .then((result) => {
            if (result === 'Email is already exists') {
              helpers.response(res, result, 403, 'error 403', 'Forbidden')
            } else {
              sendEmail.register(email, name, result[0].nik, password)
              helpers.response(res, 'Register success, check your email', 200)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      })
    })
  },
  login: (req, res) => {
    const { nik, password } = req.body
    modelTechnician.login(nik)
      .then((result) => {
        if (result.length < 1) return helpers.response(res, 'user not found!', 401, null)
        const user = result[0]
        const hash = user.password
        bcrypt.compare(password, hash).then((resCompare) => {
          if (!resCompare) return helpers.response(res, 'Password wrong!', 401, null)
          const payload = {
            id: user.id,
            nik: user.nik
          }
          jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '3h' }, (_err, token) => {
            user.token = token
            delete user.password
            helpers.response(res, user, 200)
          })
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getAllTechnician: (req, res) => {
    const search = req.query.search
    modelTechnician.getAllTechnician(search)
      .then((result) => {
        if (result != '') {
          result.map((user) => {
            delete user.password
          })
          helpers.response(res, result, 200, null)
        } else {
          helpers.response(res, 'User not found', 404, 'error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getTechnicianById: (req, res) => {
    const id = req.params.id
    modelTechnician.getTechnicianById(id)
      .then((result) => {
        if (result != '') {
          result.map((user) => {
            delete user.password
          })
          helpers.response(res, result, 200, null)
        } else {
          helpers.response(res, 'User not found', 404, 'error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateTechnician: (req, res) => {
    const id = req.params.id
    const { name, phoneNumber } = req.body
    const data = {
      name,
      phoneNumber
    }
    modelTechnician.updateTechnician(id, data)
      .then((result) => {
        helpers.response(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateImage: (req, res) => {
    const id = req.params.id
    const data = {
      image: req.files.map((item) => {
        return process.env.BASE_URL + 'uploads/' + item.filename
      }).join()
    }
    modelTechnician.updateTechnician(id, data)
      .then((result) => {
        helpers.response(res, 'Upload Image Success', 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  resetPassword: (req, res) => {
    const id = req.params.id
    const { password } = req.body
    const data = {
      password: password
    }
    bcrypt.genSalt(10, function (_err, salt) {
      bcrypt.hash(data.password, salt, function (_err, hash) {
        data.password = hash
        modelTechnician.resetPassword(id, data)
          .then((result) => {
            helpers.response(res, result, 200, null)
          })
          .catch((err) => {
            console.log(err)
          })
      })
    })
  }
}
