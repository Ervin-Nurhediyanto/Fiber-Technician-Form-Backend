require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./src/routes/index')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/api/v1/', routes)

const PORT = process.env.PORT

app.use('/uploads', express.static('./uploads'))
server.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
