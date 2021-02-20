const axios = require('axios');
const jwt = require('jsonwebtoken')

const { request_geolocation } = require('../utils/requests')


async function authenticateToken(req, res, next) {

    // const authHeader = req.headers['authorization']
    const authHeader = req.query.token
    if (authHeader == null) return res.status(401).send({ error: 'token nullo' })

    const token = authHeader.split(' ')
    if (!token.length == 2) {
        return res.status(401).send({ error: 'token error' })
    }

    jwt.verify(token[1], process.env.TOKEN_HASH, (err, useres) => {
        if (err) {
            return res.status(401).send({})
        }
        req.user = useres
        next()
    })
}


async function getGeolocation(req, res, next) {



    // try {
        
    //     await axios(request_geolocation(req.body.city))
    //         .then(data => data.data.data[0])
    //         .then((data) => { req.data = data })
    //         .then(() => next())
    // } 
    // catch (err) {
    //     console.log('getGeolocation Function', err)
    //     res.send({ error: 'Geolocation error.' })

    // }


    req.data = { latitude: -22.921065,
        longitude: -42.48219,
        type: 'locality',
        name: 'Saquarema',
        number: null,
        postal_code: null,
        street: null,
        confidence: 1,
        region: 'Rio De Janeiro',
        region_code: 'RJ',
        county: 'Saquarema',
        locality: 'Saquarema',
        administrative_area: 'Saquarema',
        neighbourhood: null,
        country: 'Brazil',
        country_code: 'BRA',
        continent: 'South America',
        label: 'Saquarema, Brazil' }
    next()

}

module.exports = {
    authenticateToken,
    getGeolocation
}
