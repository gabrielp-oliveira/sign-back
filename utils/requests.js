require('dotenv').config()
const url_horoscopo = process.env.URL_HOROSCOPO
const url_geolocation = process.env.URL_GEOLOCATION

const api_key_horoscopo = process.env.API_KEY_HOROSCOPO
const api_key_geolocation = process.env.API_KEY_GEOLOCATION



const request_horoscopo = (data) => {
    return {
        method: 'POST',
        url: url_horoscopo,
        data: data,
        headers: {
            'x-api-key': api_key_horoscopo,
            "content-type": "application/json"
        }
    }
}

const request_geolocation= (place) => {
    return {
        url: url_geolocation,
        params: {
            access_key: api_key_geolocation,
            query: place
        }
    }
}

module.exports = {
    request_horoscopo,
    request_geolocation
}
