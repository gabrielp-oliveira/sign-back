const express = require('express')
const User = require('../model/user')
const router = express.Router()
const axios = require('axios');


const { request_horoscopo } = require('../utils/requests')
const { authenticateToken, getGeolocation, authenticateHost } = require('../middlewares/middleware')

router.get('/users', (req, res) => {
    User.find()
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



router.post('/query',authenticateHost, getGeolocation, async (req, resp) => {

    const { latitude, longitude, name, region_code } = req.data
    const { person, city, Timezone, queryId } = req.body
    const [year, month, date] = req.body.dateOfBirth.split('-')

    const Userdata = await User.findOne({ _id: req.body.id })
    if (Userdata.querys.length >= 5) {
        return resp.send({ error: 'query limit reached.' })
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
                return data.data.planetaryInfo
            })
            .then((data) => {
                User.findOneAndUpdate(
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




router.get('/',authenticateHost, authenticateToken, async (req, resp) => {
    try {
        const User_ID = req.query.id

        const currentUser = await User.findOne({ _id: User_ID })
        if (currentUser) {
            return resp.send(currentUser)
        } else {
            return res.status(400).send({ error: 'error' })
        }

    } catch (error) {
        return resp.send({ error: 'error' })
    }
})




router.get('/delete/query',authenticateHost, authenticateToken, async (req, resp) => {
    const { User_ID, query_ID } = req.query



    await User.findOneAndUpdate(
        { "_id": User_ID }, { $pull: { querys: { queryId: parseInt(query_ID) } } },
        function (err, result) {
            if (err) {
                res.send({ err })
            } else {
                resp.send({ ok: "ok" })
            }
        }
    )



})

module.exports = app => app.use('/', router)