const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        minlength: 3,
        trim: true,

    },
    gender: {
        type: String,
        trim: true,
        lowercase: true
    },
    phone: {
        type: Number,
        trim: true
    },
    status: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        default: 'pending'
    },
    date: {
        type: Number,
        default: Date.now()
    }

})

const userModel = mongoose.model('Users', userSchema)
module.exports = userModel

