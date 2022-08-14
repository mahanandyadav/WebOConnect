const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


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
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]

})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.KEY_WORDS)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    // delete userObject.tokens
    return userObject
}


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await userModel.findOne({ email })
    if (!user) {
        // throw new Error('no user with email')
        return user
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('wrong Password')
    }
    return user
}

userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})

const userModel = mongoose.model('Users', userSchema)
module.exports = userModel

