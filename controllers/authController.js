const express = require('express')
const router = express.Router()
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const hash = 'çajksdnasjldb38a4sd38a5d4385a4sd35as1'
router.post('/register', async (req, res) => {
    const { email, name, password } = req.body

    try {
        console.log(email, name, password )

        if (await User.findOne({ email })) {
            console.log('usuario ja cadastrado')

            return res.send({ error: 'email ja cadastrado' })
        } else {

            const userInfo = await User.create(req.body)
            userInfo.password = undefined


            console.log('usuario cadastrado com suceso')

            const token = jwt.sign({ id: userInfo.id }, process.env.TOKEN_HASH, { expiresIn: 12000 })
            return res.send({ userInfo, token })
        }
    } catch (err) {
        console.log(err)
        return res.send({ error: 'Registration fail' })
    }

})


router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body

    
    console.log(req.body)
    const userInfo = await User.findOne({ email }).select('+password')
    if (!userInfo) {
        return res.send({ error: 'usuario nao encontrado' })
    }
    else {
        if (await bcrypt.compare(password, userInfo.password)) {
            userInfo.password = undefined
            const token = jwt.sign({ email: userInfo.email }, process.env.TOKEN_HASH, { expiresIn: 12000 })
            console.log('aqui')

            return res.send({ userInfo, token })
        } else {
            console.log('error')
            return res.send({ error: 'senha incompativel' })
        }
    }




})

module.exports = app => app.use('/auth', router)