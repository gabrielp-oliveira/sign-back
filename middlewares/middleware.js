const axios = require('axios');
const jwt = require('jsonwebtoken')

const { request_geolocation } = require('../utils/requests')


async function authenticateToken(req, res, next) {

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
    
    try {
        await axios(request_geolocation(req.body.city))
        .then(data => data.data.data[0])
        .then((data) => { req.data = data })
        .then(() => next())
    } 
    catch (err) {
        console.log('getGeolocation Function', err)
        res.send({ error: 'Geolocation error.' })
        
    }
    
}
async function authenticateHost(req, res, next) {

    const orign = process.env.URL_HOST || 'http://localhost:3000/'
    console.log(orign)

    if(req.headers.referer == orign){
        next()
    }else{
        return res.send({ error: 'Host referer error.' });
    }

}

module.exports = {
    authenticateToken,
    getGeolocation,
    authenticateHost
}
