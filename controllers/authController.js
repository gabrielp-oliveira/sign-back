const express = require('express')
const router = express.Router()
const User = require('../model/user')



const test = [{
    email: 'email',
    password: 'password'
}]



router.post('/register', async (req, res) => {
    const { email, password } = req.body
    // test.push({
    //         email: email,
    //         password: password
    //     })
    // res.send({ ok: 'ok' })
    if (await User.findOne({ email })) {
        console.log('usuario ja cadastrado')

        return res.send({ error: 'email ja cadastrado' })
    } else {

        const userInfo = await User.create(req.body)


        console.log('usuario cadastrado com suceso')
        return res.send({ userInfo })
    }

})


router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body
    // test.forEach((e) => {
    //     if(e.email == email && e.password == password){
    //         return res.send({ ok: 'ok' })
    //     }
    // })
    // res.send({ ok: 'error' })
    const userInfo = await User.findOne({ email }).select('+password')

    if (!userInfo) {
        return res.send({ error: 'usuario nao encontrado' })
    }
    else {
        if (userInfo.password === password) {
            userInfo.password = undefined

            return res.send({ userInfo, ok: 'ok' })
        } else {
            return res.send({ error: 'senha incompativel' })
        }
    }
    



})

module.exports = app => app.use('/auth', router)