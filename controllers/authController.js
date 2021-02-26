const express = require('express')
const router = express.Router()
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { validateEmail } = require('../utils/regex')

const {authenticateHost} = require('../middlewares/middleware')

router.post('/register',  async (req, res) => {
    const { email, name, password } = req.body

    try {
        if (!email && !name && !password) return res.send({ error: 'Please, fill the fields below.' })
        if (!name) return res.send({ error: 'Name field is empty' })
        else if (name.length <= 3) return res.send({ error: 'Name too short' })
        if (!email) return res.send({ error: 'Email field is empty' })
        if (!password) return res.send({ error: 'Password field is empty' })
        else if (password.length <= 3) return res.send({ error: 'Password shorter than 3 caracteres.' })
        else if (password.length >= 10) return res.send({ error: 'Password bigger than 10 caracteres.' })
        if (!validateEmail(email)) return res.send({ error: 'Error, use a valid email' })


        if (await User.findOne({ email })) {
            return res.send({ error: 'Email alread registred' })
        } else {

            const userInfo = await User.create(req.body)
            userInfo.password = undefined

            const token = jwt.sign({ id: userInfo.id }, process.env.TOKEN_HASH, { expiresIn: 12000 })
            return res.send({ userInfo, token })
        }
    } catch (err) {
        return res.send({ error: 'Registration fail' })
    }

})


router.post('/authenticate',  async (req, res) => {
    const { email, password } = req.body

    if (!email && !password) return res.send({ error: 'Please, fill the fields below.' })
    if (!password) return res.send({ error: 'Password field is empty' })
    if (!email) return res.send({ error: 'Email field is empty' })


    const userInfo = await User.findOne({ email }).select('+password')
    if (!userInfo) {
        return res.send({ error: 'User not found' })
    }
    else {
        if (await bcrypt.compare(password, userInfo.password)) {
            userInfo.password = undefined
            const token = jwt.sign({ email: userInfo.email }, process.env.TOKEN_HASH, { expiresIn: 1200 })

            return res.send({ userInfo, token })
        } else {
            return res.send({ error: 'senha incompativel' })
        }
    }




})

module.exports = app => app.use('/auth', router)