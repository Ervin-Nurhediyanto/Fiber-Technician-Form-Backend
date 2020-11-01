const nodemailer = require('nodemailer')

module.exports = {
  register: (email, name, nik, password) => {
    const transporter = nodemailer.createTransport({
      service: process.env.MAILER_SERVICE_PROVIDER,
      auth: {
        user: process.env.MAILER_EMAIL_ID,
        pass: process.env.MAILER_PASSWORD
      }
    })

    const mailOptions = {
      from: process.env.MAILER_EMAIL_ID,
      to: email,
      subject: 'Register Success',
      html: `<h3>Register Success</h3><p><b>Name :</b> ${name}</p><p><b>NIK :</b> ${nik}</p><p><b>Password :</b> ${password}</p>`
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw err
      console.log('Email sent: ' + mailOptions.to + ' ' + info.response)
    })
  }
}
