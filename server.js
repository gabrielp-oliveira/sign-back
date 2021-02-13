const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const user = require('./model/user')



app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
require('./controllers/authController')(app)

app.get('/',  (req, resp) => {

    resp.send({ok: 'ok!'})
})

app.get('/users', (req, res) => {
    user.find()
      .exec((err, users) => {
        if (err) {
        } else {
          res.send(users);
        }
      });
  });




app.listen(process.env.PORT || 8080, console.log('iniciando server...'))
