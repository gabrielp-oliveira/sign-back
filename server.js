const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
require('./controllers/authController')(app)
require('./controllers/root')(app)




app.listen(process.env.PORT || 8080, console.log('iniciando server...'))
