const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const axios = require('axios');


const { request_horoscopo } = require('./utils/requests')
const { authenticateToken, getGeolocation } = require('./middlewares/middleware')

const user = require('./model/user')


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
require('./controllers/authController')(app)

app.get('/users', (req, res) => {
  user.find()
    .exec((err, users) => {
      if (err) {
      } else {
        res.send(users);
      }
    });
});






const search = (name, lat, long, place, place_code, year, mouth, date, Timezone) => {
  return {
    "name": name,
    "place": {
      "name": `${place},${place_code}`,
      "longitude": long,
      "latitude": lat,
      "timeZoneId": Timezone
    },
    "year": year,
    "month": mouth,
    "date": date,
    "hour": 23,
    "minutes": 30,
    "seconds": 0,
    "options": {
      "Ayanamsa": "LAHARI"
    }
  }
}



  app.post('/query',  getGeolocation, async (req, resp) => {

  const { latitude, longitude, name, region_code } = req.data
  const { person, city, Timezone, queryId } = req.body
  const [year, month, date] = req.body.dateOfBirth.split('-')

  const Userdata = await user.findOne({ _id: req.body.id })
  if (Userdata.querys.length >= 50) {
    resp.send({ error: 'query limit reached.' })
  }

  try {

    await axios(
      request_horoscopo(
        search(person, latitude, longitude, name, region_code, year, month, date, Timezone)
      ))
      .then((data) => {
        data.data.planetaryInfo.person = person
        data.data.planetaryInfo.queryId = queryId
        data.data.planetaryInfo.dateOfBirth = req.body.dateOfBirth
        resp.json(data.data.planetaryInfo)
        console.log(queryId)
        return data.data.planetaryInfo
      })
      .then((data) => {
        user.findOneAndUpdate(
          { _id: req.body.id },
          { $push: { querys: data } }, (err, data) => {
            if (err) {
              console.log('update error')
            } else {
              console.log('query salvo')
            }
          }
        )

      })


  } catch (error) {
    console.log('/query ', error)
    resp.send({ error })
  }
  // resp.send(result)
})




app.get('/', authenticateToken, async (req, resp) => {
  try {
    const User_ID = req.query.id
    console.log(User_ID)
    const currentUser = await user.findOne({ _id: User_ID })
    if (currentUser) {
      return resp.send(currentUser)
    } else {
      return res.status(400).send({ error: 'error' })
    }

  } catch (error) {
    resp.send({ error: 'error' })
  }
})




app.get('/delete/query', authenticateToken, async (req, resp) => {
  const {User_ID, query_ID} = req.query

  // console.log(query_ID.toString())

  
  await user.findOneAndUpdate(
    {"_id": User_ID}, {$pull: {querys: {queryId: parseInt(query_ID)}}},
    function(err, result){
      if (err) {
        res.send({err})
      } else {
        resp.send({ok:"ok"})
      }
    }
    )



})



app.listen(process.env.PORT || 8080, console.log('iniciando server...'))
