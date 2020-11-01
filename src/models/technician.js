const connection = require('../configs/db')

module.exports = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM technician WHERE email = ?', data.email, (err, result) => {
        if (!err) {
          if (result != '') {
            resolve('Email is already exists')
          } else {
            connection.query('INSERT INTO technician SET ?', data, (err, result) => {
              if (!err) {
                connection.query('SELECT * FROM technician ORDER BY nik DESC', (err, result) => {
                  if (!err) {
                    if (result[0].nik != '') {
                      const nik = Number(result[0].nik) + 1
                      connection.query(`UPDATE technician SET nik = ${nik} WHERE email = ?`, data.email, (err, result) => {
                        if (!err) {
                          connection.query('SELECT * FROM technician WHERE email = ?', data.email, (err, result) => {
                            if (!err) {
                              resolve(result)
                            } else {
                              reject(new Error(err))
                            }
                          })
                        } else {
                          reject(new Error(err))
                        }
                      })
                    } else {
                      const nik = 2100578925
                      connection.query(`UPDATE technician SET nik = ${nik} WHERE email = ?`, data.email, (err, result) => {
                        if (!err) {
                          connection.query('SELECT * FROM technician WHERE email = ?', data.email, (err, result) => {
                            if (!err) {
                              resolve(result)
                            } else {
                              reject(new Error(err))
                            }
                          })
                        } else {
                          reject(new Error(err))
                        }
                      })
                    }
                  } else {
                    reject(new Error(err))
                  }
                })
              } else {
                reject(new Error(err))
              }
            })
          }
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  login: (nik) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM technician WHERE nik = ?', nik, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  resetPassword: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE technician SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve('Reset Password Success')
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getTechnicianById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM technician WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getAllTechnician: (search) => {
    return new Promise((resolve, reject) => {
      let searchTechnician = ''

      if (search) {
        searchTechnician = `WHERE search LIKE '%${search}%' OR email LIKE '%${search}%' OR nik LIKE '%${search}%'`
      }

      connection.query(`SELECT * FROM technician ${searchTechnician}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateTechnician: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE technician SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve('Update Success')
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateImage: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE technician SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve('Upload Image Success')
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
