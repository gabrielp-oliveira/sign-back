const mongoose = require('../database/index')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
})


const user = mongoose.model('user', userSchema)
module.exports = user